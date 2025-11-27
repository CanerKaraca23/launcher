/**
 * Web-specific style utilities for react-native-web
 * These utilities help bypass TypeScript errors for CSS properties
 * that are valid in web browsers but not in React Native's type definitions.
 */

import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

// Web-specific CSS properties that aren't in React Native types
// Use Omit to remove the base outlineStyle and redefine it with "none" included
export type WebViewStyle = Omit<ViewStyle, "outlineStyle" | "cursor"> & {
  outlineStyle?: "none" | "solid" | "dotted" | "dashed";
  cursor?: string;
  userSelect?: "none" | "auto" | "text" | "all";
};

export type WebTextStyle = Omit<TextStyle, "outlineStyle"> & {
  outlineStyle?: "none" | "solid" | "dotted" | "dashed";
  cursor?: string;
  userSelect?: "none" | "auto" | "text" | "all";
};

type WebNamedStyles<T> = {
  [P in keyof T]: WebViewStyle | WebTextStyle | ImageStyle;
};

/**
 * A wrapper around StyleSheet.create that allows web-specific CSS properties.
 * Use this instead of StyleSheet.create when you need properties like
 * outlineStyle: "none" or cursor: "default".
 */
export function createWebStyles<T extends WebNamedStyles<T>>(
  styles: T
): T {
  return StyleSheet.create(styles as any) as T;
}
