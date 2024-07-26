import React from 'react';
import {RouterContext} from "next/dist/shared/lib/router-context.shared-runtime";
import {AppRouterContext} from "next/dist/shared/lib/app-router-context.shared-runtime";

export function createMockRouter(router) {
    return {
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn().mockResolvedValue(undefined),
        back: jest.fn(),
        forward: jest.fn(),
        reload: jest.fn(),
        ...router,
    };
}

export const NavigationContext = RouterContext;
export const AppNavigationContext = AppRouterContext;