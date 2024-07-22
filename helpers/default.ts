import type { DefaultsInstance, ThemeDefinition } from 'vuetify'

export const defaults : DefaultsInstance = {
    VAppbar: {
        elevation: 0,
    },

    VBtn: {
        variant: 'flat',
        height: 40,
        rounded: "lg",
        size: "small",
    },

    VTextField: {
        color: "primary",
        variant: "outlined",
        density: "comfortable",
        rounded: "lg",
    },
}