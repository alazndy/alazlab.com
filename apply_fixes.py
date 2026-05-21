import os

# --- MediaListenerService.kt Fix ---
mls_path = r"C:\Users\turha\Desktop\Dev_Ops_New\05_Mobile_&_Gaming\Apps\GT Launcher\app\src\main\java\com\lcars\launcher\services\MediaListenerService.kt"
with open(mls_path, 'r', encoding='utf-8') as f:
    mls_content = f.read()

# Add Uri import if missing
if "import android.net.Uri" not in mls_content:
    mls_content = mls_content.replace("import android.graphics.Bitmap", "import android.graphics.Bitmap\nimport android.net.Uri")

# Update updateMetadata function
old_metadata_func = """    private fun updateMetadata(metadata: MediaMetadata?) {
        if (metadata == null) return
        val title = metadata.getString(MediaMetadata.METADATA_KEY_TITLE)
        val artist = metadata.getString(MediaMetadata.METADATA_KEY_ARTIST)
        val art = metadata.getBitmap(MediaMetadata.METADATA_KEY_ALBUM_ART)
                 ?: metadata.getBitmap(MediaMetadata.METADATA_KEY_ART)

        MediaState.updateTrack(title, artist, art)
    }"""

new_metadata_func = """    private fun updateMetadata(metadata: MediaMetadata?) {
        if (metadata == null) return
        val title = metadata.getString(MediaMetadata.METADATA_KEY_TITLE)
        val artist = metadata.getString(MediaMetadata.METADATA_KEY_ARTIST)
        
        var art = metadata.getBitmap(MediaMetadata.METADATA_KEY_ALBUM_ART)
                 ?: metadata.getBitmap(MediaMetadata.METADATA_KEY_ART)

        if (art == null) {
            val artUriStr = metadata.getString(MediaMetadata.METADATA_KEY_ALBUM_ART_URI)
                         ?: metadata.getString(MediaMetadata.METADATA_KEY_ART_URI)
            if (!artUriStr.isNullOrBlank()) {
                try {
                    val uri = Uri.parse(artUriStr)
                    contentResolver.openInputStream(uri)?.use { 
                        art = BitmapFactory.decodeStream(it)
                    }
                } catch (e: Exception) {
                    Log.e("MediaListener", "Error loading art from URI: $artUriStr")
                }
            }
        }

        MediaState.updateTrack(title, artist, art)
    }"""

mls_content = mls_content.replace(old_metadata_func, new_metadata_func)

with open(mls_path, 'w', encoding='utf-8') as f:
    f.write(mls_content)


# --- DynamicCardRenderer.kt Fix ---
dcr_path = r"C:\Users\turha\Desktop\Dev_Ops_New\05_Mobile_&_Gaming\Apps\GT Launcher\app\src\main\java\com\lcars\launcher\ui\screens\DynamicCardRenderer.kt"
with open(dcr_path, 'r', encoding='utf-8') as f:
    dcr_content = f.read()

# Update onNext
old_on_next = 'onNext = { MediaState.activeController?.transportControls?.skipToNext() },'
new_on_next = """onNext = { 
                        val ctrl = MediaState.activeController
                        if (ctrl != null) {
                            ctrl.transportControls.skipToNext()
                        } else {
                            try {
                                val am = context.getSystemService(Context.AUDIO_SERVICE) as android.media.AudioManager
                                am.dispatchMediaKeyEvent(android.view.KeyEvent(android.view.KeyEvent.ACTION_DOWN, android.view.KeyEvent.KEYCODE_MEDIA_NEXT))
                                am.dispatchMediaKeyEvent(android.view.KeyEvent(android.view.KeyEvent.ACTION_UP, android.view.KeyEvent.KEYCODE_MEDIA_NEXT))
                            } catch (e: Exception) {}
                        }
                    },"""

# Update onPrevious
old_on_prev = 'onPrevious = { MediaState.activeController?.transportControls?.skipToPrevious() },'
new_on_prev = """onPrevious = { 
                        val ctrl = MediaState.activeController
                        if (ctrl != null) {
                            ctrl.transportControls.skipToPrevious()
                        } else {
                            try {
                                val am = context.getSystemService(Context.AUDIO_SERVICE) as android.media.AudioManager
                                am.dispatchMediaKeyEvent(android.view.KeyEvent(android.view.KeyEvent.ACTION_DOWN, android.view.KeyEvent.KEYCODE_MEDIA_PREVIOUS))
                                am.dispatchMediaKeyEvent(android.view.KeyEvent(android.view.KeyEvent.ACTION_UP, android.view.KeyEvent.KEYCODE_MEDIA_PREVIOUS))
                            } catch (e: Exception) {}
                        }
                    },"""

dcr_content = dcr_content.replace(old_on_next, new_on_next)
dcr_content = dcr_content.replace(old_on_prev, new_on_prev)

with open(dcr_path, 'w', encoding='utf-8') as f:
    f.write(dcr_content)

print("Media fixes applied successfully.")
