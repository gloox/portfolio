package com.geetloomba._048.model;

import javafx.scene.media.AudioClip;
// DELETE THIS IMPORT: import java.net.URL; <--- This crashes GWT

public class FancyAudio {

    public static void createBleepSound() {
        // Pass the filename. If it's at the root of 'resources', just use the name.
        playClip("30_item_3.wav");
    }

    private static void playClip(String resourcePath) {
        try {
            // WEB FIX: Don't use getResource() or URL objects.
            // WebFX expects a simple string path relative to the index.html
            // If the file is in 'src/main/resources', just pass the name.

            // Note: We create the clip directly with the string
            AudioClip clip = new AudioClip(resourcePath);
            clip.play();

        } catch (Exception e) {
            // In the browser, 'e.printStackTrace()' logs to the browser console (F12)
            System.out.println("Audio Error: " + e.getMessage());
        }
    }
}