import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export default function InsectScanner() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef<Camera>(null);
  const [isActive, setIsActive] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.infoText}>
          This app needs access to your camera to scan insects.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return <Text>Loading camera...</Text>;
  }

  const handleCancel = () => {
    setIsActive(false);
    router.back();
  };

  const handleScan = async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    try {
      const photo = await camera.current?.takePhoto({

        flash: 'off',
      });
      console.log('Captured photo:', photo?.path);
    } catch (error) {
      console.error('Error capturing photo:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
      />
      <View style={styles.overlayContainer}>
        <View style={styles.scanArea}>
          <View style={[styles.border, styles.topLeft]} />
          <View style={[styles.border, styles.topRight]} />
          <View style={[styles.border, styles.bottomLeft]} />
          <View style={[styles.border, styles.bottomRight]} />
        </View>
        <Text style={styles.instruction}>Align the insect inside the frame</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleScan}
          disabled={isCapturing}
          style={[
            styles.captureButton,
            isCapturing && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.buttonText}>
            {isCapturing ? 'Scanning...' : 'Scan'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#00FF99',
  },
  topLeft: { top: -1, left: -1, borderLeftWidth: 4, borderTopWidth: 4 },
  topRight: { top: -1, right: -1, borderRightWidth: 4, borderTopWidth: 4 },
  bottomLeft: { bottom: -1, left: -1, borderLeftWidth: 4, borderBottomWidth: 4 },
  bottomRight: {
    bottom: -1,
    right: -1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  instruction: {
    color: '#fff',
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cancelButton: {
    backgroundColor: '#444',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  captureButton: {
    backgroundColor: '#00FF99',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: { color: '#000', fontWeight: '600', fontSize: 16 },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: '#00FF99',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  permissionButtonText: { color: '#000', fontWeight: '600' },
});