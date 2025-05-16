import { render, screen, waitFor } from '@testing-library/react';
import PageList from '../app/[locale]/page';

jest.mock('../app/lib/pageQueries', () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockGetPages = require('../app/lib/pageQueries_old').default;

describe('PageList', () => {
    const locale = 'fr-FR';
    const graphQLLocale = nextToGraphQLLocales[locale];

    beforeEach(() => {
        mockGetPages.mockReset();
    });

    it('displays pages for a valid locale', async () => {
        const mockData = [
            {
                slug: 'page-daccueil-fr',
                uri: '/page-daccueil-fr/',
                language: {
                    code: 'FR_FR',
                    locale: 'fr_FR',
                },
                pageDAccueilBloc1: { background: { node: { mediaItemUrl: 'url1' } } },
                pageDAccueilBloc2: {},
                pageDAccueilBloc3: {},
                pageDAccueilBloc4: {},
                pageDAccueilBloc5: {},
                pageDAccueilBloc6: {},
                pageDAccueilBloc7: {},
                pageDAccueilBloc8: {},
                pageDAccueilBloc9: {},
            },
        ];

        mockGetPages.mockResolvedValueOnce(mockData);

        render(<PageList locale={locale} />);

        await waitFor(() => {
            const localeText = screen.getByText(`Router locale: ${locale}`);
            expect(localeText).toBeInTheDocument();
        });

        const graphQLLocaleText = screen.getByText(`GraphQL Locale: ${graphQLLocale}`);
        expect(graphQLLocaleText).toBeInTheDocument();

        const pageContent = screen.getByText(/bloc10/i);
        expect(pageContent).toBeInTheDocument();
    });

    it('displays no pages available message', async () => {
        mockGetPages.mockResolvedValueOnce([]);

        render(<PageList locale={locale} />);

        await waitFor(() => {
            const noPagesText = screen.getByText(/No pages found for this locale/i);
            expect(noPagesText).toBeInTheDocument();
        });
    });
});
