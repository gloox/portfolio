package com.geetloomba._048.model;

import javafx.animation.TranslateTransition;
import javafx.scene.Node;
import javafx.scene.layout.AnchorPane;
import javafx.util.Duration;

public class FancyTransition {
    // I realize now that I could have extended TranslateTransition like I did with buttons and text but it
    // would be way too annoying to change it now

    private final TranslateTransition transition;
    private final Node node;
    private final AnchorPane pane;

    //constructor
    public FancyTransition(Node node, AnchorPane pane){
        this.node = node;
        this.pane = pane;
        transition = new TranslateTransition();
    }

    public void createTransition(double translationDuration, int translationAmmount){
        // node, in this case, would be an image or text

        // set up transition
        transition.setDuration(Duration.seconds(translationDuration));
        transition.setNode(node);
        pane.getChildren().add(node);

        // make transition
        transition.setToX(translationAmmount);
        transition.play();
    }

    public void moveTransition(double translationDuration, int translationAmmount){
        // I didn't end up using this but I totally could if I implemented transitions differently
        transition.setToX(translationAmmount);
        transition.play();
    }

    public TranslateTransition getTransition(){
        return transition;
    }
}
