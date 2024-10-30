<?php
/**
 * Twenty Twenty-Four functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Twenty Twenty-Four
 * @since Twenty Twenty-Four 1.0
 */

/**
 * Register block styles.
 */
if ( ! function_exists( 'twentytwentyfour_block_styles' ) ) :
	function twentytwentyfour_block_styles() {
		register_block_style(
			'core/details',
			array(
				'name'         => 'arrow-icon-details',
				'label'        => __( 'Arrow icon', 'twentytwentyfour' ),
				'inline_style' => '
				.is-style-arrow-icon-details {
					padding-top: var(--wp--preset--spacing--10);
					padding-bottom: var(--wp--preset--spacing--10);
				}
				.is-style-arrow-icon-details summary {
					list-style-type: "\2193\00a0\00a0\00a0";
				}
				.is-style-arrow-icon-details[open]>summary {
					list-style-type: "\2192\00a0\00a0\00a0";
				}',
			)
		);
		// Ajoutez d'autres styles de bloc ici...
	}
endif;
add_action( 'init', 'twentytwentyfour_block_styles' );

/**
 * Enqueue block stylesheets.
 */
if ( ! function_exists( 'twentytwentyfour_block_stylesheets' ) ) :
	function twentytwentyfour_block_stylesheets() {
		wp_enqueue_block_style(
			'core/button',
			array(
				'handle' => 'twentytwentyfour-button-style-outline',
				'src'    => get_parent_theme_file_uri( 'assets/css/button-outline.css' ),
				'ver'    => wp_get_theme( get_template() )->get( 'Version' ),
				'path'   => get_parent_theme_file_path( 'assets/css/button-outline.css' ),
			)
		);
	}
endif;
add_action( 'init', 'twentytwentyfour_block_stylesheets' );

/**
 * Register pattern categories.
 */
if ( ! function_exists( 'twentytwentyfour_pattern_categories' ) ) :
	function twentytwentyfour_pattern_categories() {
		register_block_pattern_category(
			'twentytwentyfour_page',
			array(
				'label'       => _x( 'Pages', 'Block pattern category', 'twentytwentyfour' ),
				'description' => __( 'A collection of full page layouts.', 'twentytwentyfour' ),
			)
		);
	}
endif;
add_action( 'init', 'twentytwentyfour_pattern_categories' );

add_action('template_redirect', 'rediriger_si_pas_co');
function rediriger_si_pas_co(): void {
    if (!is_user_logged_in()){
        auth_redirect();
    }
}

// Fonction pour sauvegarder et déboguer les champs ACF
function my_save_post($post_id) {
    // Vérifier si c'est une sauvegarde automatique
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Vérifier les autorisations de l'utilisateur
    if (!current_user_can('edit_post', $post_id)) {
        return $post_id;
    }

    // Ajouter une entrée de débogage pour vérifier
    error_log('Test de débogage avant de vérifier ACF');

    // Déboguer les champs ACF
    if (isset($_POST['acf'])) {
        error_log('Données ACF trouvées : ' . print_r($_POST['acf'], true)); // Log les données des champs ACF
    } else {
        error_log('Aucune donnée ACF trouvée');
    }

    // Sauvegarder les champs ACF spécifiques
    // Remplacez 'field_name' par le nom de votre champ ACF
    if (isset($_POST['acf']['field_name'])) {
        update_post_meta($post_id, 'field_name', sanitize_text_field($_POST['acf']['field_name']));
    }
}
add_action('save_post', 'my_save_post');
