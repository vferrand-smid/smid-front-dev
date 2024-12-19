import { createMocks } from 'node-mocks-http';
import middleware from '../middleware';
import expect from "expect";

describe('Middleware', () => {
    it('should trigger middleware and log messages', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            url: 'http://localhost:3000/',
            headers: {
                'accept-language': 'en-GB'
            }
        });

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        await middleware(req, res);

        // Afficher les journaux pour débogage
        consoleSpy.mock.calls.forEach((call, index) => {
        });

        consoleErrorSpy.mock.calls.forEach((call, index) => {
        });

        // Vérifications
        expect(consoleSpy).toHaveBeenCalledWith('Middleware triggered');
        expect(consoleSpy).toHaveBeenCalledWith('Request headers:', {"accept-language": "en-GB"});
        expect(consoleSpy).toHaveBeenCalledWith('Request headers in getLocale:', {"accept-language": "en-GB"});
        expect(consoleSpy).toHaveBeenCalledWith('Languages extracted by Negotiator: en-GB');
        expect(consoleSpy).toHaveBeenCalledWith('Filtered languages from request: en-GB');
        expect(consoleSpy).toHaveBeenCalledWith('Canonical language: en-GB');
        expect(consoleSpy).toHaveBeenCalledWith('Checking if en-GB exists in nextToGraphQLLocales');
        expect(consoleSpy).toHaveBeenCalledWith('Locale found: EN_GB');
        expect(consoleSpy).toHaveBeenCalledWith('Matched locale: EN_GB');
        expect(consoleSpy).toHaveBeenCalledWith('Request URL: http://localhost:3000/');
        expect(consoleSpy).toHaveBeenCalledWith('Next.js Locale: EN_GB');
        expect(consoleSpy).toHaveBeenCalledWith('URL pathname: /');
        expect(consoleSpy).toHaveBeenCalledWith('URL with locale param: http://localhost:3000/?locale=EN_GB');

        consoleSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});








/*import { createMocks } from 'node-mocks-http';
import middleware from '../middleware';
import expect from "expect";
describe('Middleware', () => {
    it('should trigger middleware and log messages', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            url: 'http://localhost:3000/',
            headers: {
                'accept-language': 'en-GB'
            }
        });

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        await middleware(req, res);

        // Afficher les journaux pour débogage
        consoleSpy.mock.calls.forEach((call, index) => {
            console.log(`Console log ${index + 1}:`, call);
        });

        consoleErrorSpy.mock.calls.forEach((call, index) => {
            console.log(`Console error ${index + 1}:`, call);
        });

        // Vérifications
        expect(consoleSpy).toHaveBeenCalledWith('Middleware triggered');
        expect(consoleSpy).toHaveBeenCalledWith('Request headers:', {"accept-language": "en-GB"});
        expect(consoleSpy).toHaveBeenCalledWith('Request headers in getLocale:', {"accept-language": "en-GB"});
        expect(consoleSpy).toHaveBeenCalledWith('Languages extracted by Negotiator: en-GB');
        expect(consoleSpy).toHaveBeenCalledWith('Filtered languages from request: en-GB');
        expect(consoleSpy).toHaveBeenCalledWith('Canonical language: en-GB');
        expect(consoleSpy).toHaveBeenCalledWith('Checking if en-GB exists in nextToGraphQLLocales');
        expect(consoleSpy).toHaveBeenCalledWith('Locale found: EN_GB');
        expect(consoleSpy).toHaveBeenCalledWith('Matched locale: EN_GB');
        expect(consoleSpy).toHaveBeenCalledWith('Request URL: http://localhost:3000/');
        expect(consoleSpy).toHaveBeenCalledWith('Next.js Locale: EN_GB');
        expect(consoleSpy).toHaveBeenCalledWith('URL pathname: /');
        expect(consoleSpy).toHaveBeenCalledWith('URL with locale param: http://localhost:3000/?locale=EN_GB');

        consoleSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});*/



/*
import { createMocks } from 'node-mocks-http';
import middleware from '../middleware';

describe('Middleware', () => {
    it('should trigger middleware and log messages', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            url: 'http://localhost:3000/',
            headers: {
                'accept-language': 'en-GB'
            }
        });

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        const response = await middleware(req, res);

        // Afficher les journaux pour débogage
        consoleSpy.mock.calls.forEach((call, index) => {
            console.log(`Console log ${index + 1}:`, call);
        });

        consoleErrorSpy.mock.calls.forEach((call, index) => {
            console.log(`Console error ${index + 1}:`, call);
        });

        // Vérifications
        expect(consoleSpy).toHaveBeenCalledWith('Middleware triggered');
        expect(consoleSpy).toHaveBeenCalledWith('Filtered languages from request:', ['en-GB']);
        expect(consoleSpy).toHaveBeenCalledWith('Canonical language:', 'en-GB');
        expect(consoleSpy).toHaveBeenCalledWith('Matched locale:', 'EN_GB');
        expect(consoleSpy).toHaveBeenCalledWith('Request URL: http://localhost:3000/');
        expect(consoleSpy).toHaveBeenCalledWith('Next.js Locale: EN_GB');
        expect(consoleSpy).toHaveBeenCalledWith('URL pathname: /');
        expect(consoleSpy).toHaveBeenCalledWith('URL with locale param: http://localhost:3000/?locale=EN_GB');

        // Vérifiez si la réécriture se produit correctement
        expect(response.status).toBe(200);
        const rewrittenUrl = response.headers.get('x-middleware-rewrite');
        expect(rewrittenUrl).toContain('locale=EN_GB');

        consoleSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});
*/
