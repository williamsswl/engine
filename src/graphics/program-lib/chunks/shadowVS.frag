
float getShadowHardVS(sampler2D shadowMap, vec3 shadowParams) {
    float depth = unpackFloat(texture2DProj(shadowMap, vMainShadowUv));
    return (depth < min(vMainShadowUv.z + shadowParams.z, 1.0)) ? 0.0 : 1.0;
}

float getShadowPCF3x3VS(sampler2D shadowMap, vec3 shadowParams) {
    dShadowCoord = vMainShadowUv.xyz;
    dShadowCoord.z += shadowParams.z;
    dShadowCoord.xyz /= vMainShadowUv.w;
    dShadowCoord.z = min(dShadowCoord.z, 1.0);
    return _getShadowPCF3x3(shadowMap, shadowParams);
}

float getShadowVSMVS(sampler2D shadowMap, vec3 shadowParams) {
    dShadowCoord = vMainShadowUv.xyz;
    dShadowCoord.z += shadowParams.z;
    dShadowCoord.xyz /= vMainShadowUv.w;
    dShadowCoord.z = min(dShadowCoord.z, 1.0);

    vec2 moments = unpackEVSM(texture2D(shadowMap, dShadowCoord.xy));
    return VSM(moments, dShadowCoord.z);
}

