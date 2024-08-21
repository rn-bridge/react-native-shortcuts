package com.rnbridge.shortcuts

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.os.Build
import androidx.annotation.ChecksSdkIntAtLeast
import androidx.core.content.pm.ShortcutInfoCompat
import androidx.core.content.pm.ShortcutManagerCompat
import androidx.core.graphics.drawable.IconCompat
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class RNShortcutsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var context: ReactApplicationContext = reactContext

    init {
        context.addActivityEventListener(this)
    }

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun getInitialShortcutId(promise: Promise) {
        val shortCutId = currentActivity?.intent?.getStringExtra("shortcutId")
        promise.resolve(shortCutId)
    }

    @ReactMethod
    fun isShortcutSupported(promise: Promise) {
        promise.resolve(isSupported)
    }

    @ReactMethod
    fun addShortcut(params: ReadableMap, promise: Promise) = handleShortcutOperation(promise) {
        val shortcut = createShortcut(params)
        ShortcutManagerCompat.pushDynamicShortcut(context, shortcut)
        promise.resolve(shortcut.toWritableMap())
    }

    @ReactMethod
    fun updateShortcut(params: ReadableMap, promise: Promise) = handleShortcutOperation(promise) {
        val id = params.getString("id") ?: throw Exception("No ID provided")
        getShortcutById(id) ?: throw Exception("No shortcut with id: $id")
        val updatedShortcut = createShortcut(params)
        ShortcutManagerCompat.updateShortcuts(context, listOf(updatedShortcut))
        promise.resolve(updatedShortcut.toWritableMap())
    }

    @ReactMethod
    fun removeShortcut(id: String, promise: Promise) = handleShortcutOperation(promise) {
        ShortcutManagerCompat.removeDynamicShortcuts(context, listOf(id))
        promise.resolve(true)
    }

    @ReactMethod
    fun removeAllShortcuts(promise: Promise) = handleShortcutOperation(promise) {
        ShortcutManagerCompat.removeAllDynamicShortcuts(context)
        promise.resolve(true)
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

    private fun handleShortcutOperation(promise: Promise, operation: () -> Unit) {
        if (!isSupported) {
            promise.reject(Error("Unsupported OS version"))
            return
        }
        try {
            operation()
        } catch (error: Exception) {
            promise.reject(error)
        }
    }

    @ReactMethod
    fun isShortcutExists(id: String, promise: Promise) {
        val shortcut = getShortcutById(id = id)
        promise.resolve(shortcut != null)
    }

    private fun createShortcut(params: ReadableMap): ShortcutInfoCompat {
        val id = params.getString("id") ?: throw Exception("No ID provided")
        val shortLabel = params.getString("title") ?: throw Exception("No title provided")
        val longLabel = params.getString("longLabel")
        val iconName = params.getString("iconName")

        val intent = Intent(context, currentActivity?.javaClass).apply {
            putExtra("shortcutId", id)
            action = Intent.ACTION_VIEW
        }

        return ShortcutInfoCompat.Builder(context, id).apply {
            setShortLabel(shortLabel)
            setIntent(intent)
            longLabel?.let { setLongLabel(it) }
            getIconResourceId(iconName = iconName).takeIf { it != 0 }
                ?.let { icon -> setIcon(IconCompat.createWithResource(context, icon)) }
        }.build()
    }

    private fun getShortcutById(id: String): ShortcutInfoCompat? {
        val shortcuts = ShortcutManagerCompat.getDynamicShortcuts(context)
        return shortcuts.firstOrNull { it.id == id }
    }

    private fun ShortcutInfoCompat.toWritableMap(): WritableMap {
        return Arguments.createMap().apply {
            putString("id", id)
            putString("title", shortLabel.toString())
            putString("longLabel", longLabel.toString())
        }
    }

    private val isSupported: Boolean
        @ChecksSdkIntAtLeast(api = Build.VERSION_CODES.N_MR1)
        get() {
            return Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1
        }

    @SuppressLint("DiscouragedApi")
    private fun getIconResourceId(iconName: String?): Int {
        return iconName?.let {
            context.resources.getIdentifier(
                it,
                "drawable",
                context.packageName
            )
        } ?: 0
    }

    private fun sendEvent(id: String) {
        context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("onShortcutUsed", id)
    }

    override fun onActivityResult(a: Activity?, b: Int, c: Int, d: Intent?) {}

    override fun onNewIntent(intent: Intent?) {
        val shortCutId = intent?.getStringExtra("shortcutId")
        if (shortCutId != null) {
            sendEvent(shortCutId)
        }
    }

    override fun invalidate() {
        context.removeActivityEventListener(this)
        super.invalidate()
    }

    companion object {
        const val NAME = "RNShortcuts"
    }
}
