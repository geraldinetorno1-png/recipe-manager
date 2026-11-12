import { afterEach, beforeEach, expect, it } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/features/auth/auth.hooks";
beforeEach(() => localStorage.clear());
afterEach(cleanup);
it("trims the display name, remembers it after remount, and signs out", () => {
  const first = renderHook(() => useAuth(), { wrapper: AuthProvider });
  act(() => first.result.current.login("   "));
  expect(first.result.current.isLoggedIn).toBe(false);
  act(() => first.result.current.login("  Geraldine  "));
  expect(first.result.current.user).toBe("Geraldine");
  first.unmount();
  const second = renderHook(() => useAuth(), { wrapper: AuthProvider });
  expect(second.result.current.isLoggedIn).toBe(true);
  act(() => second.result.current.logout());
  expect(second.result.current.user).toBeNull();
  expect(localStorage.getItem("auth-user")).toBeNull();
});
it("explains a missing provider", () => {
  expect(() => renderHook(() => useAuth())).toThrow("useAuth must be used inside <AuthProvider>");
});
