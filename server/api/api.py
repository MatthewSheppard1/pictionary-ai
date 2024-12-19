import random

import torch
from flask import Flask, jsonify, request, current_app
from pictionary_model import PictionaryModel
from flask_cors import CORS
from torch.utils.data import DataLoader, Dataset
import torch.nn.functional as F


app = Flask(__name__)
CORS(app)
with app.app_context():
    current_app.data_received = 0

pnn = PictionaryModel()
pnn.load_state_dict(torch.load("pnn.pt", weights_only=True))
optim = torch.optim.Adam(pnn.parameters(), lr=0.001)

class ImageDataset(Dataset):
    def __init__(self, data):
        self.data = data

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.data[idx]


def save_data(data):
    imgs = []
    labels = []
    for i in data:
        imgs.append(i[0])
        labels.append(i[1])

    labels = torch.tensor(labels)
    imgs = torch.stack(imgs)
    torch.save(imgs, "imgs.pt")
    torch.save(labels, "labels.pt")

def load_list():
    imgs = torch.load("imgs.pt")
    labels = torch.load("labels.pt")
    data = []
    for i in range(len(imgs)):
        data.append((imgs[i], labels[i].item()))

    return data


image_data = load_list()


def process_points(points):
    input_data = torch.zeros([1, 400, 400])
    for point in points:
        input_data[0][point[0]][point[1]] = 1
    return input_data


def train(data, optimizer, num_steps):
    dataloader = DataLoader(ImageDataset(data), batch_size=8, shuffle=True)
    step = 0
    while step < num_steps:
        for x, y in dataloader:
            loss = F.cross_entropy(pnn(x), y)
            loss.backward()
            optimizer.step()
            optimizer.zero_grad()
            step += 1
            if(step >= num_steps):
                break
        print(step)


    torch.save(pnn.state_dict(), "pnn.pt")
    save_data(data)

@app.route('/guess', methods=['POST'])
def guess():
    data = request.get_json()
    points = data.get("points")
    input_data = process_points(points)
    input_data = input_data.unsqueeze(0)
    with torch.no_grad():
        results = torch.argmax(pnn(input_data), dim=1).item()

    response = {"message": results}
    return jsonify(response)


@app.route('/final-data', methods=['POST'])
def add_data():
    data = request.get_json()
    points = data.get("points")
    input_data = process_points(points)
    label = data.get("label")
    image_data.append((input_data, label))
    current_app.data_received += 1

    if current_app.data_received >= 50:
        current_app.data_received = 0
        train(image_data, optim, int(len(image_data) / 2))
    print(current_app.data_received)

    return jsonify({})




if __name__ == "__main__":
    app.run(debug=True)
