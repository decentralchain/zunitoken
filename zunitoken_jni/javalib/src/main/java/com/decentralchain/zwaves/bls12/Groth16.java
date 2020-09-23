package com.decentralchain.zunitoken .bls12;

public class Groth16 {
    public static native boolean verify(byte[] vk, byte[] proof, byte[] inputs);

    static {
        new JNILibrary("zunitoken _jni", Groth16.class).load();
    }
}