package com.geetloomba._048.model;

import javafx.scene.control.Label;
import javafx.scene.text.Font;

public class FancyText extends Label {

    private final String FONT_PATH ="zx-spectrum.ttf";
    private final String stringIn;


    public FancyText(String stringIn){
        this.stringIn = stringIn;
        createLabel();
    }

    public FancyText(String stringIn, int fontSize){
        this.stringIn = stringIn;
        createLabel(fontSize);
    }

    private void createLabel() {
        setText(stringIn);
       setFont(Font.loadFont("zx-spectrum.ttf", 30));
    }

    private void createLabel(int fontSize) {
        setText(stringIn);
        setFont(Font.loadFont("zx-spectrum.ttf", fontSize));
    }
}
