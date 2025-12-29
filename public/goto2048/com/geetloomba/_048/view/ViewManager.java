package com.geetloomba._048.view;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import com.geetloomba._048.model.FancyAudio;
import com.geetloomba._048.model.FancyButton;
import com.geetloomba._048.model.FancyText;

import java.io.File;

// This class is one used to create the main view which is the main menu.
public class ViewManager {

	private static final int HEIGHT = 760; // height and width of the window
	private static final int WIDTH = 1280;

	private final AnchorPane mainPane; // the window (sort of)
	private final Stage mainStage; // a container necessary for javaFX
	private final Scene mainScene; // this is contained in the stage and has all the content


	public ViewManager() {
		mainPane = new AnchorPane();
		mainScene = new Scene(mainPane, WIDTH, HEIGHT );
		mainStage = new Stage();
		mainStage.setScene(mainScene); //a stage can only have one scene (except for subscenes)
		// below I use methods to create the Button, Background, and TitleCard
		createButtonRun();
		createBackground();
		createTitleCard();
	}

	public Stage getMainStage() {
		return mainStage;
	}

	private void createButtonRun() {
		String runUnpressed ="RUNunpressed.png";
		String runPressed ="RUNpressed.png";

		FancyButton startButton = new FancyButton(runPressed, runUnpressed, 104, 36);
		//set x and y of the element
		startButton.setLayoutX(30);
		startButton.setLayoutY(HEIGHT - 60);

		mainPane.getChildren().add(startButton); // mainPane is the container
		// and getChildren is used to add elements to the container

		startButton.setOnAction(new EventHandler<ActionEvent>() {

			@Override
			public void handle(ActionEvent event) {
				FancyAudio.createBleepSound();

				GameViewManager gameManager = new GameViewManager(); // create a new stage for the game
				gameManager.createNewGame(mainStage);
			}
		});
	}


	private void createBackground() {
		Image backgroundImage = new Image("whitescreenBackground.png", 1280, 760, false, false);
		BackgroundImage background = new BackgroundImage(backgroundImage, BackgroundRepeat.REPEAT, BackgroundRepeat.REPEAT, BackgroundPosition.DEFAULT, null);
		//all the parameters above could techincally be null because they are all the default
		mainPane.setBackground(new Background(background));
	}

	private void createTitleCard() {
		String titleText = """
				01 PRINT AT 2,4 "2048"
				10\s
				20 PRINT "by geet\"""";

		FancyText title = new FancyText(titleText);
		title.setLayoutX(30);
		title.setLayoutY(30);

		mainPane.getChildren().add(title);
	}
}

