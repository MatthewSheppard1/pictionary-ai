import torch
from torch import nn


class ConvBlock(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.layers = nn.Sequential(nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1), nn.ReLU(), nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1), nn.ReLU(), nn.Dropout2d(), nn.MaxPool2d(2, 2))

    def forward(self, x):
        return self.layers(x)


class PictionaryModel(nn.Module):
    def __init__(self, num_output_classes):
        super().__init__()
        #sizes: 400x400 200x200 100x100 50x50 25x25
        #channels: 1       64      128    256   512
        self.conv_layers = nn.Sequential(ConvBlock(1, 64), ConvBlock(64, 128), ConvBlock(128, 256), ConvBlock(256, 512))
        self.linear_layers = nn.Sequential(nn.Flatten(), nn.Linear(25 * 25 * 512, 1000), nn.ReLU(), nn.Linear(1000, 100), nn.Softmax())
