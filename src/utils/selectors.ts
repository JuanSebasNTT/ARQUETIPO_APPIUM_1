// src/utils/selectors.ts
export const androidWidget = 'android.widget.';
export const androidViewGroup = 'android.view.ViewGroup';
export const beginSelector = '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup';
export const endSelector = 'android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.EditText';

export const textViewClass = `//${androidWidget}TextView`;
export const buttonClass = `//${androidWidget}Button`;

export const loginSelectors = {
    usuario: `${beginSelector}/android.view.ViewGroup[1]/${endSelector}`,
    contrasena: `${beginSelector}/android.view.ViewGroup[2]/${endSelector}`,
};

export const buttons = {
    Ingresar: 'Ingresar',
};

export const commonsSelectores = {
    codigoConfirmacion: `${textViewClass}[@text="Código de confirmación"]`,
};