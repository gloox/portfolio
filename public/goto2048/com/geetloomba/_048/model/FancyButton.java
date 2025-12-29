package com.geetloomba._048.model;

import javafx.event.EventHandler;
import javafx.scene.control.Button;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseButton;
import javafx.scene.input.MouseEvent;
import javafx.geometry.Insets;

public class FancyButton extends Button {

	private final ImageView pressedView;
	private final ImageView unpressedView;

	public FancyButton(String pressedPath, String unpressedPath, int width, int height) {


		this.pressedView = new ImageView(pressedPath);
		this.unpressedView = new ImageView(unpressedPath);

		pressedView.setFitWidth(width);
		pressedView.setFitHeight(height);
		unpressedView.setFitWidth(width);
		unpressedView.setFitHeight(height);

		setPrefWidth(width);
		setPrefHeight(height);
		setPadding(Insets.EMPTY);

		setStyle("-fx-background-color: transparent;");

		setFocusTraversable(false);

		setGraphic(unpressedView);

		initializeButtonListeners();
	}

	private void initializeButtonListeners() {

		setOnMousePressed(new EventHandler<MouseEvent>() {
			@Override
			public void handle(MouseEvent event) {
				if (event.getButton().equals(MouseButton.PRIMARY)) {
					setGraphic(pressedView);
				}
			}
		});

		setOnMouseReleased(new EventHandler<MouseEvent>() {
			@Override
			public void handle(MouseEvent event) {
				if (event.getButton().equals(MouseButton.PRIMARY)) {
					setGraphic(unpressedView);
				}
			}
		});
	}
}