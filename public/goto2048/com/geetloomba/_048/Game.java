package com.geetloomba._048;

import java.util.Arrays;
import java.util.Random;


public class Game {

    private final int[][] board = new int[][]{{0, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0, 0}};
    private int points = 0;
    private boolean hasWon = false;
    private boolean gameOver = false;

    public Game() {
        // 2 tiles randomly spawn when the game begins
        setRandomTile();
        setRandomTile();
    }

    public void isGameOver(Game test) {
        // checks if the game is over
        boolean boardFull = true;

        // for loop iterates through the elements in the board until an element = 0, and then it makes the boardFull
        // boolean false and loop breaks
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    boardFull = false;
                    break;
                }
            }
        }

        if (boardFull) {
            test.setBoard(board); // the test board is the made the same as the main board
            // the board is tested in all directions
            test.upMove();
            test.leftMove();
            test.downMove();
            test.rightMove();

            // if the test board remains the same as the original board that means there is no possible
            // move left for the player and thus the game should be over
            if (Arrays.deepEquals(test.getBoard(), board)) {
                gameOver = true;
            }
        }
    }

    public void upMove() {
        for (int index2 = 0; index2 < 4; index2++) {
            // iterates through the columns, starting from the top

            boolean combinedLast = false;
            boolean allSame = board[3][index2] == board[2][index2] && board[1][index2] == board[0][index2];
            // checks if the elements in the column are all the same

            for (int index1 = 3; index1 > 0; index1--) {
                // iterates through the rows, starting from the bottom

                if (board[index1][index2] != 0) {

                    if (board[index1 - 1][index2] == 0) {
                        // if the spot above the non-zero number is 0
                        // then the spot above is replaced by the non-zero
                        board[index1 - 1][index2] = board[index1][index2];
                        board[index1][index2] = 0;
                    }

                    else if (board[index1][index2] == board[index1 - 1][index2] && (!combinedLast)) {
                        // if the spot above the non-zero number is the same as itself
                        // then the current spot becomes zero and the spot above becomes the addition of the two elements

                        board[index1 - 1][index2] = board[index1][index2] + board[index1 - 1][index2];

                        points += board[index1 - 1][index2]; // the combined value is added to the points total
                        if (board[index1 - 1][index2] == 32 && !hasWon){
                            hasWon = true;
                        }
                        board[index1][index2] = 0;

                        combinedLast = true; // this boolean becomes true because a combination has occured
                    }

                    else if (board[index1][index2] == board[index1 - 1][index2]) {
                        // if the spot above the non-zero number is the same as itself
                        // but this one only happens when a combination has already happened
                        // so an element that has combined already should not combine again
                        combinedLast = false;

                        // that is, unless all the numbers in the column are the same
                        // in which case two combinations in the same column can occur
                        if (allSame) {
                            board[index1 - 1][index2] = board[index1][index2] + board[index1 - 1][index2];
                            points += board[index1 - 1][index2];
                            if (board[index1 - 1][index2] == 32 && !hasWon){
                                hasWon = true;
                            }
                            board[index1][index2] = 0;
                        }
                    }
                }
            }

            // the two for loops below exist to remove the empty space (0's) between elements
            // while the above for loops remove most of the empty spaces, there are times where
            // there will be some that the ones below will remove

            for (int index12 = 3; index12 > 0; index12--) {
                if (board[index12 - 1][index2] == 0) {
                    board[index12 - 1][index2] = board[index12][index2];
                    board[index12][index2] = 0;
                }
            }

            for (int index12 = 1; index12 <= 3; index12++) {
                if (board[index12 - 1][index2] == 0) {
                    board[index12 - 1][index2] = board[index12][index2];
                    board[index12][index2] = 0;
                }
            }
        }
    }

    // the following work in a very similar way to the upMove

    public void leftMove() {
        for (int index1 = 0; index1 < 4; index1++) {
            boolean combinedLast = false;
            boolean allSame = board[index1][3] == board[index1][2] && board[index1][1] == board[index1][0];

            for (int index2 = 3; index2 > 0; index2--) {
                if (board[index1][index2] != 0) {
                    if (board[index1][index2 - 1] == 0) {
                        board[index1][index2 - 1] = board[index1][index2];
                        board[index1][index2] = 0;
                    } else if (board[index1][index2] == board[index1][index2 - 1] && (!combinedLast)) {
                        board[index1][index2 - 1] = board[index1][index2] + board[index1][index2 - 1];
                        points += board[index1][index2 - 1];
                        if (board[index1][index2 - 1] == 32 && !hasWon){
                            hasWon = true;
                        }
                        board[index1][index2] = 0;
                        combinedLast = true;
                    } else if (board[index1][index2] == board[index1][index2 - 1]) {
                        combinedLast = false;

                        if (allSame) {
                            board[index1][index2 - 1] = board[index1][index2] + board[index1][index2 - 1];
                            points += board[index1][index2 - 1];
                            if (board[index1][index2 - 1] == 32 && !hasWon){
                                hasWon = true;
                            }
                            board[index1][index2] = 0;
                        }
                    }
                }
            }

            for (int index21 = 3; index21 > 0; index21--) {
                if (board[index1][index21 - 1] == 0) {
                    board[index1][index21 - 1] = board[index1][index21];
                    board[index1][index21] = 0;
                }
            }

            for (int index21 = 1; index21 <= 3; index21++) {
                if (board[index1][index21 - 1] == 0) {
                    board[index1][index21 - 1] = board[index1][index21];
                    board[index1][index21] = 0;
                }
            }
        }
    }

    public void downMove() {
        for (int index2 = 0; index2 < 4; index2++) {
            boolean combinedLast = false;
            boolean allSame = board[3][index2] == board[2][index2] && board[1][index2] == board[0][index2];

            for (int index1 = 0; index1 < 3; index1++) {
                if (board[index1][index2] != 0) {
                    if (board[index1 + 1][index2] == 0) {
                        board[index1 + 1][index2] = board[index1][index2];
                        board[index1][index2] = 0;
                    } else if (board[index1][index2] == board[index1 + 1][index2] && (!combinedLast)) {
                        board[index1 + 1][index2] = board[index1][index2] + board[index1 + 1][index2];
                        points += board[index1 + 1][index2];
                        if (board[index1 + 1][index2] == 32 && !hasWon){
                            hasWon = true;
                        }
                        board[index1][index2] = 0;
                        combinedLast = true;
                    } else if (board[index1][index2] == board[index1 + 1][index2]) {
                        combinedLast = false;

                        if (allSame) {
                            board[index1 + 1][index2] = board[index1][index2] + board[index1 + 1][index2];
                            points += board[index1 + 1][index2];
                            if (board[index1 + 1][index2] == 32 && !hasWon){
                                hasWon = true;
                            }
                            board[index1][index2] = 0;
                        }
                    }
                }
            }

            for (int index12 = 0; index12 < 3; index12++) {
                if (board[index12 + 1][index2] == 0) {
                    board[index12 + 1][index2] = board[index12][index2];
                    board[index12][index2] = 0;
                }
            }

            for (int index12 = 2; index12 >= 0; index12--) {
                if (board[index12 + 1][index2] == 0) {
                    board[index12 + 1][index2] = board[index12][index2];
                    board[index12][index2] = 0;
                }
            }
        }
    }

    public void rightMove() {
        for (int index1 = 0; index1 < 4; index1++) {
            boolean combinedLast = false;
            boolean allSame = board[index1][3] == board[index1][2] && board[index1][1] == board[index1][0];

            for (int index2 = 0; index2 < 3; index2++) {
                if (board[index1][index2] != 0) {
                    if (board[index1][index2 + 1] == 0) {
                        board[index1][index2 + 1] = board[index1][index2];
                        board[index1][index2] = 0;
                    } else if (board[index1][index2] == board[index1][index2 + 1] && (!combinedLast)) {
                        board[index1][index2 + 1] = board[index1][index2] + board[index1][index2 + 1];
                        points += board[index1][index2 + 1];
                        if (board[index1][index2 + 1] == 32 && !hasWon){
                            hasWon = true;
                        }
                        board[index1][index2] = 0;
                        combinedLast = true;
                    } else if (board[index1][index2] == board[index1][index2 + 1]) {
                        combinedLast = false;

                        if (allSame) {
                            board[index1][index2 + 1] = board[index1][index2] + board[index1][index2 + 1];
                            points += board[index1][index2 + 1];
                            if (board[index1][index2 + 1] == 32 && !hasWon) {
                                hasWon = true;
                            }
                            board[index1][index2] = 0;
                        }
                    }
                }
            }

            for (int index21 = 0; index21 < 3; index21++) {
                if (board[index1][index21 + 1] == 0) {
                    board[index1][index21 + 1] = board[index1][index21];
                    board[index1][index21] = 0;
                }
            }

            for (int index21 = 2; index21 >= 0; index21--) {
                if (board[index1][index21 + 1] == 0) {
                    board[index1][index21 + 1] = board[index1][index21];
                    board[index1][index21] = 0;
                }
            }
        }
    }

    public void moveHelper(Game test, String direction) {
        // this helper is necessary to test if the move that the player decided makes no change

        test.setBoard(board); // this test board is used to test the validity of the player's move

        switch (direction) {
            case "up" -> upMove();
            case "left" -> leftMove();
            case "down" -> downMove();
            case "right" -> rightMove();
        }

        // if the move the player makes creates no change, then a new random tile is not spawned
        if (!Arrays.deepEquals(test.getBoard(), board)) {
            setRandomTile();
        }
    }

    public void setRandomTile() {
        Random rand = new Random();
        float randNum = rand.nextFloat(); // picks a random float
        int value = 2;

        // there is a 10 percent chance of the value changing to a 4
        if (randNum >= 0.9) {
            value = 4;
        }

        int index1;
        int index2;
        boolean placed = false;
        int count = 0; // checks the amount of time the randomizer has had to test

        while (!placed && count < 17){
            index1 = rand.nextInt(4);
            index2 = rand.nextInt(4);

            if (board[index1][index2] == 0){
                board[index1][index2] = value;
                placed = true;
            }
            count++;
        }
    }

    public int[][] getBoard() {
        return board;
    }

    public void setBoard(int[][] otherBoard) {
        // takes an array, and makes it the same as the main board

        for (int i = 0; i < 4; i++) {
            board[i] = new int[4];
            System.arraycopy(otherBoard[i], 0, board[i], 0, 4);
        }
    }

    public boolean getGameOver() {
        return gameOver;
    }

    public int getPoints() {
        return points;
    }

    public boolean getHasWon(){
        return hasWon;
    }
}
