package com.rnbridge.shortcuts

import android.content.Intent
import android.os.Build
import androidx.annotation.ChecksSdkIntAtLeast
import androidx.core.content.pm.ShortcutInfoCompat
import androidx.core.content.pm.ShortcutManagerCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

class RNShortcutsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var context: ReactApplicationContext = reactContext

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun isShortcutSupported(promise: Promise) {
        promise.resolve(isSupported)
    }

    @ReactMethod
    fun onShortcutUsed(callback: Callback) {
        val shortCutId = currentActivity?.intent?.getStringExtra("shortcutId")
        if (shortCutId != null) {
            callback.invoke(shortCutId)
        }
    }

    @ReactMethod
    fun addShortcut(params: ReadableMap, promise: Promise) {
        if (!isSupported) {
            promise.reject(Error("Unsupported os version"))
            return
        }
        try {
            val id = params.getString("id") as String
            val shortLabel = params.getString("shortLabel") as String
            val longLabel = params.getString("longLabel") as String

            val shortcut = createShortcut(id = id, shortLabel = shortLabel, longLabel = longLabel)
            ShortcutManagerCompat.pushDynamicShortcut(context, shortcut)
            promise.resolve(true)
        } catch (error: Exception) {
            promise.reject(error)
        }

    }

    @ReactMethod
    fun updateShortcut(params: ReadableMap, promise: Promise) {
        if (!isSupported) {
            promise.reject(Error("Unsupported os version"))
            return
        }

        try {
            val id = params.getString("id") as String
            val shortLabel = params.getString("shortLabel") as String
            val longLabel = params.getString("longLabel") as String

            val shortcut = getShortcutById(id)

            if (shortcut == null) {
                promise.reject(Error("No shortcut with the id: $id"))
                return
            }

            val updatedShortcut =
                createShortcut(id = id, shortLabel = shortLabel, longLabel = longLabel)
            ShortcutManagerCompat.updateShortcuts(context, listOf(updatedShortcut))
            promise.resolve(true)
        } catch (error: Exception) {
            promise.reject(error)
        }
    }

    @ReactMethod
    fun removeShortcut(id: String, promise: Promise) {
        if (!isSupported) {
            promise.reject(Error("Unsupported os version"))
            return
        }

        try {
            ShortcutManagerCompat.removeDynamicShortcuts(context, listOf(id))
            promise.resolve(true)
        } catch (error: Exception) {
            promise.reject(error)
        }
    }

    @ReactMethod
    fun removeAllShortcuts(promise: Promise) {
        if (!isSupported) {
            promise.reject(Error("Unsupported os version"))
            return
        }

        try {
            ShortcutManagerCompat.removeAllDynamicShortcuts(context)
            promise.resolve(true)
        } catch (error: Exception) {
            promise.reject(error)
        }
    }

    @ReactMethod
    fun getShortcutById(id: String, promise: Promise) {
        val shortcut = getShortcutById(id = id)
        if (shortcut == null) {
            promise.resolve(null)
            return
        }

        promise.resolve(shortcut.toWritableMap())

    }

    @ReactMethod
    fun isShortcutExists(id: String, promise: Promise) {
        val shortcut = getShortcutById(id = id)
        promise.resolve(shortcut != null)
    }

    private fun createShortcut(
        id: String,
        shortLabel: String,
        longLabel: String
    ): ShortcutInfoCompat {
        val intent = Intent(context, currentActivity?.javaClass)
        intent.putExtra("shortcutId", id);
        intent.action = Intent.ACTION_VIEW

        val shortcut = ShortcutInfoCompat.Builder(context, id)
            .setShortLabel(shortLabel)
            .setLongLabel(longLabel)
            .setIntent(intent)
            .build()

        return shortcut
    }

    private fun getShortcutById(id: String): ShortcutInfoCompat? {
        val shortcuts = ShortcutManagerCompat.getDynamicShortcuts(context)
        return shortcuts.firstOrNull { it.id == id }
    }

    private fun ShortcutInfoCompat.toWritableMap(): WritableMap {
        val map = Arguments.createMap()
        map.putString("id", id)
        map.putString("shortLabel", shortLabel.toString())
        map.putString("longLabel", longLabel.toString())
        return map
    }

    private val isSupported: Boolean
        @ChecksSdkIntAtLeast(api = Build.VERSION_CODES.N_MR1)
        get() {
            return Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1
        }

    companion object {
        const val NAME = "RNShortcuts"
    }
}
