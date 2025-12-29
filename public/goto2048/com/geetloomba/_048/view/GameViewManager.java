package com.geetloomba._048.view;

import com.geetloomba._048.Game;
import javafx.animation.TranslateTransition;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import com.geetloomba._048.model.FancyButton;
import com.geetloomba._048.model.FancyText;
import com.geetloomba._048.model.FancyTransition;

// this is the view for the actual game that will turn the Game class into a GUI
public class GameViewManager {

    private static final int GAME_HEIGHT = 760;
    private static final int GAME_WIDTH = 1280;

    private AnchorPane gamePane;
    private Scene gameScene;
    private Stage gameStage;
    private Stage menuStage;

    private final Game basicGame = new Game();
    private final Game testBoard = new Game();

    private boolean gameOver = false;
    private boolean gameWon = false;
    private boolean alreadyWon = false;

    // FIX: Add this flag to stop the board from drawing over the menu
    private boolean menuActive = false;

    private final int xBoard = (int) (GAME_WIDTH/2f - 504/2f);
    private final int yBoard = (int) (GAME_HEIGHT/2f - 504/2f);

    private FancyText pointsText;

    public GameViewManager() {
        initializeStage();
        createKeyListeners();
        createBackground();
        createBoard();
        createPoints();
    }

    private void initializeStage() {
        gamePane = new AnchorPane();
        gameScene = new Scene(gamePane, GAME_WIDTH, GAME_HEIGHT);
        gameStage = new Stage();
        gameStage.setScene(gameScene);
    }

    public void createNewGame(Stage mStage) {
        menuStage = mStage;
        menuStage.hide();
        gameStage.show();

        gamePane.setFocusTraversable(true);
        gamePane.requestFocus();
    }

    private void createKeyListeners() {
        gameScene.setOnKeyPressed(new EventHandler<KeyEvent>() {
            @Override
            public void handle(KeyEvent event) {

                if (event.getCode() == KeyCode.LEFT && !gameOver && !menuActive) {
                    basicGame.moveHelper(testBoard, "left");
                }
                else if (event.getCode() == KeyCode.RIGHT && !gameOver && !menuActive) {
                    basicGame.moveHelper(testBoard, "right");
                }
                else if (event.getCode() == KeyCode.UP && !gameOver && !menuActive) {
                    basicGame.moveHelper(testBoard, "up");
                }
                else if (event.getCode() == KeyCode.DOWN && !gameOver && !menuActive) {
                    basicGame.moveHelper(testBoard, "down");
                }
                else if (event.getCode() == KeyCode.ESCAPE){
                    menuStage.show();
                    gameStage.close();
                }

                if ((event.getCode() == KeyCode.LEFT || event.getCode() == KeyCode.RIGHT ||
                        event.getCode() == KeyCode.UP || event.getCode() == KeyCode.DOWN)
                        && !gameOver && !menuActive) { // FIX: Add !menuActive here too

                    basicGame.isGameOver(testBoard);
                    gameOver = basicGame.getGameOver();
                    gameWon = basicGame.getHasWon();

                    pointsText.setText("POINTS: " + basicGame.getPoints());

                    createPiecesAndBoard();

                    if (gameWon && !alreadyWon){
                        createWinCard();
                        alreadyWon = true;
                    }
                    if (gameOver){
                        createEndCard();
                    }
                }
            }
        });
    }

    private void createBackground() {
        Image backgroundImage = new Image("whitescreenBackground.png", 1280, 760, false, false);
        BackgroundImage background = new BackgroundImage(backgroundImage, BackgroundRepeat.REPEAT, BackgroundRepeat.REPEAT, BackgroundPosition.DEFAULT, null);
        gamePane.setBackground(new Background(background));
    }

    private void createPoints(){
        pointsText = new FancyText("POINTS: " + basicGame.getPoints());
        pointsText.setLayoutX(460);
        pointsText.setLayoutY(20);
        gamePane.getChildren().add(pointsText);
    }

    public void createThing(String source, int x, int y){
        ImageView thingImage = new ImageView(source);
        thingImage.setLayoutX(x);
        thingImage.setLayoutY(y);
        gamePane.getChildren().add(thingImage);
    }

    public void createBoard() {
        createThing("board.png", xBoard, yBoard);
    }

    private String returnDirectory(int num){
        String directory = "";
        switch (num) {
            case 2 -> directory ="2.png";
            case 4 -> directory ="4.png";
            case 8 -> directory ="8.png";
            case 16 -> directory ="16.png";
            case 32 -> directory ="32.png";
            case 64 -> directory ="64.png";
            case 128 -> directory ="128.png";
            case 256 -> directory ="256.png";
            case 512 -> directory ="512.png";
            case 1024 -> directory ="1024.png";
            case 2048 -> directory ="2048.png";
            case 4096 -> directory ="4096.png";
            case 8196 -> directory ="8196.png";
        }
        return directory;
    }

    private void createPiecesAndBoard(){
        int[][] gameBoard = basicGame.getBoard();
        createBoard();

        for (int i = 0; i < 4; i++){
            for (int j = 0; j < 4; j++){
                int tileNum = gameBoard[i][j];

                if (tileNum != 0) {
                    String imageDirectory = returnDirectory(tileNum);
                    // Using primitive math to avoid Property binding errors
                    int xLocation = xBoard + (18 * (j+ 1)) + (102 * j);
                    int yLocation = yBoard + (18 * (i+ 1)) + (102 * i);
                    createThing(imageDirectory, xLocation, yLocation);
                }
            }
        }
    }


    private void createEndCard(){
        menuActive = true;

        ImageView transWhite = new ImageView("transparentWhite.png");
        transWhite.setLayoutX(1280);
        transWhite.setLayoutY(0);
        FancyTransition wTransition = new FancyTransition(transWhite, gamePane);
        wTransition.createTransition(0.3, -1280);

        FancyText gameOverText = new FancyText("GAMEOVER", 70);
        gameOverText.setLayoutX(1280);
        gameOverText.setLayoutY(300);
        FancyTransition gOTransition = new FancyTransition(gameOverText, gamePane);
        gOTransition.createTransition(0.3, (int) -(GAME_WIDTH/2 + 310));

        createButtonRestart();
        createButtonMenu();
    }


    private void createWinCard(){
        menuActive = true;

        ImageView transWhite = new ImageView("transparentWhite.png");
        transWhite.setLayoutX(1280);
        transWhite.setLayoutY(0);
        FancyTransition wTransition = new FancyTransition(transWhite, gamePane);
        wTransition.createTransition(0.3, -1280);

        FancyText winText = new FancyText("YOU WIN", 70);
        winText.setLayoutX(1280);
        winText.setLayoutY(300);
        FancyTransition winTransition = new FancyTransition(winText, gamePane);
        winTransition.createTransition(0.3, (int) -(GAME_WIDTH/2 + 280));

        createButtonRestart();
        createButtonMenu();
        createButtonContinue(wTransition.getTransition(), winTransition.getTransition());
    }

    FancyButton restartButton;
    FancyButton continueButton;
    FancyButton menuButton;

    private void createButtonRestart() {
        String restartUnpressed ="RESTARTunpressed.png";
        String restartPressed ="RESTARTpressed.png";

        restartButton = new FancyButton(restartPressed, restartUnpressed, 238, 35);

        restartButton.setFocusTraversable(false);

        restartButton.setLayoutX(1280);
        restartButton.setLayoutY(GAME_HEIGHT - 200);

        FancyTransition restartTransition = new FancyTransition(restartButton, gamePane);
        restartTransition.createTransition(0.3, (int) -(GAME_WIDTH/2f + 100));

        restartButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                GameViewManager gameManager = new GameViewManager();
                gameManager.createNewGame(gameStage);
            }
        });
    }


    private void createButtonContinue(TranslateTransition transWhite, TranslateTransition transWin) {
        String continueUnpressed ="CONTINUEunpressed.png";
        String continuePressed ="CONTINUEpressed.png";

        continueButton = new FancyButton(continuePressed, continueUnpressed, 272, 35);

        continueButton.setFocusTraversable(false);

        continueButton.setLayoutX(1280);
        continueButton.setLayoutY(GAME_HEIGHT - 250);

        FancyTransition continueTransition = new FancyTransition(continueButton, gamePane);
        continueTransition.createTransition(0.3, (int) -(GAME_WIDTH/2f + 120));

        continueButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                transWhite.setToX(1280);
                transWin.setToX((int) (GAME_WIDTH/2 + 310));
                transWhite.play();
                transWin.play();

                gamePane.getChildren().remove(menuButton);
                gamePane.getChildren().remove(restartButton);
                gamePane.getChildren().remove(continueButton);

                gamePane.requestFocus();
                menuActive = false;
            }
        });
    }

    private void createButtonMenu() {
        String menuUnpressed ="MENUunpressed.png";
        String menuPressed ="MENUpressed.png";

        menuButton = new FancyButton(menuPressed, menuUnpressed, 136, 35);

        menuButton.setFocusTraversable(false);

        menuButton.setLayoutX(1280);
        menuButton.setLayoutY(GAME_HEIGHT - 150);

        FancyTransition menuTransition = new FancyTransition(menuButton, gamePane);
        menuTransition.createTransition(0.3, (int) -(GAME_WIDTH/2f + 60));

        menuButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                menuStage.show();
                gameStage.close();
            }
        });
    }
}