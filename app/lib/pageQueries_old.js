export default async function getPages(locale) {
    if (!locale) {
        throw new Error("Locale n'est pas définie!");
    }

    const languageCode = nextToGraphQLLocales[locale];
    if (!languageCode) {
        throw new Error(`Invalid locale: ${locale}`);
    }

    const query = `query ($code: LanguageCodeFilterEnum!) {
        pages(where: { language: $code }) {
            edges {
                node {
                    slug
                    uri
                    language {
                        code
                        locale
                    }
                    pageDAccueilBloc1 {
                        titre_bloc1
                        titre_h4_bloc1
                        repeteur_check_green_bloc1 {
                            check_green {
                                node {
                                    mediaItemUrl
                                }
                            }
                            texte_repeteur_check_green_bloc1
                        }
                        repeteur_check_white_bloc1 {
                            check_white {
                                node {
                                    mediaItemUrl
                                }
                            }
                            texte_check_white
                        }
                        heroGirl {
                            node {
                                mediaItemUrl
                            }
                        }
                        background {
                            node {
                                mediaItemUrl
                            }
                        }
                    }
                    pageDAccueilBloc2 {
                        repeteur1 {
                            img_repeteur1 {
                                node {
                                    mediaItemUrl
                                }
                            }
                            titre_repeteur1
                        }
                    }
                    pageDAccueilBloc3 {
                        titre_bloc3_span
                        titre_bloc3
                        repeteurCkeckBlack {
                            checkBlack {
                                node {
                                    mediaItemUrl
                                }
                            }
                            texteCheckBlack
                            imageCkeckBlack {
                                node {
                                    mediaItemUrl
                                }
                            }
                        }
                        repeteur_etape {
                            check_green {
                                node {
                                    mediaItemUrl
                                }
                            }
                            texte_etape
                            titre_check
                            image_repeteur_etape {
                                node {
                                    mediaItemUrl
                                }
                            }
                        }
                    }
                    pageDAccueilBloc4 {
                        titre_bloc4_1
                        titre_bloc4_2
                        titre_bloc4_span
                        partenaires {
                            fieldGroupName
                            ... on PageDAccueilBloc4PartenairesLayout {
                                fieldGroupName
                                text
                                img {
                                    node {
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                        media {
                            fieldGroupName
                            ... on PageDAccueilBloc4MediaLayout {
                                fieldGroupName
                                text
                                img {
                                    node {
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                        temoignages {
                            nom
                            texte
                            titre
                        }
                        nos_partenaires
                        nos_medias
                    }
                    pageDAccueilBloc5 {
                        imgService {
                            node {
                                mediaItemUrl
                            }
                        }
                        listeService {
                            check {
                                node {
                                    mediaItemUrl
                                }
                            }
                            service24h24Et7j7
                            texteService
                        }
                        titre_bloc5_1
                        titre_bloc5_span
                    }
                    pageDAccueilBloc6 {
                        bloc_photo {
                            ... on PageDAccueilBloc6BlocPhotoLayout {
                                fieldGroupName
                                impressionPhoto
                                paragraphe
                                partenaires {
                                    nom_partenaire
                                    img_partenaire {
                                        node {
                                            mediaItemUrl
                                        }
                                    }
                                }
                                planche_photo {
                                    node {
                                        mediaItemUrl
                                    }
                                }
                            }
                        }
                        titre_bloc6_1
                        titre_bloc6_2
                        titre_bloc6_span
                        documents {
                            titre_doc
                            img_doc {
                                node {
                                    mediaItemUrl
                                }
                            }
                        }
                    }
                    pageDAccueilBloc7 {
                        bloc {
                            img_check {
                                node {
                                    mediaItemUrl
                                }
                            }
                            img_principal {
                                node {
                                    mediaItemUrl
                                }
                            }
                            paragraphe
                            titre
                        }
                        titre_bloc7_1
                        titre_bloc7_2
                        titre_bloc7_span
                    }
                    pageDAccueilBloc8 {
                        bloc_conseils {
                            check {
                                node {
                                    mediaItemUrl
                                }
                            }
                            chiffre
                            texte
                            texte_span
                        }
                        bouton_plus {
                            url
                            title
                        }
                        lienBebe {
                            url
                            title
                        }
                        titre_bloc8_1
                        titre_bloc8_2
                        titre_bloc8_span
                        titre_encart
                        video
                    }
                    pageDAccueilBloc9 {
                        codeEphoto {
                            texte_accordeon
                            titre_accordeon
                            fieldGroupName
                        }
                        photo_didentite {
                            texteAccordeon
                            titre_accordeon
                            fieldGroupName
                        }
                        titre_bloc9
                        titre_bloc9_span
                        fieldGroupName
                    }
                }
            }
        }
    }`;

    const response = await fetch(process.env.WORDPRESS_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                code: languageCode,
            },
        }),
    });

    if (!response.ok) {
        console.error('pageQueries.js - API Error:', response.status, response.statusText);
        throw new Error(`Failed to fetch API: ${response.status} ${response.statusText}`);
    }

    const jsonResponse = await response.json();

    if (!jsonResponse || !jsonResponse.data || !jsonResponse.data.pages) {
        console.error("pageQueries.js - Réponse invalide de l'API", jsonResponse);
        return [];
    }

    const pages = jsonResponse.data.pages.edges.map((edge) => edge.node).filter((page) => page.slug !== 'sample-page' && page.uri);
    return pages;
}
