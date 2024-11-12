<?php
define( 'WP_CACHE', true ); // Added by WP Rocket

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_smidbackdev_db' );

/** Database username */
define( 'DB_USER', 'vanessa' );

/** Database password */
define( 'DB_PASSWORD', 'aaaa' );

/** Database hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '4SPH+uy1;1t)D;29-|42s~&)H#7fk&|p1P+3Se+iL%o81Pp7/%sJcKBs0MlpAi6s');
define('SECURE_AUTH_KEY', 'pC5/aE|*a91Y5W/U+J;54O8p8~5hIzJ*8:Vdq%w6[a353IYcDM5F!n(21!KQ!Q9W');
define('LOGGED_IN_KEY', 'h~-DXg7tf68370CgK4E~(g52/!;Y~BpolcH#*c7AQ4kG51h2#nhXy9j62f&kB#]6');
define('NONCE_KEY', '%7hF-PM4*%!E5k:5))6dT[1+r40AB7p2JN&2y3N-sIAN15p2nuK*&]2K;*9aIi4g');
define('AUTH_SALT', '3nZ&at%80/Z@C3~59y+|~9D1KEEybAWe4t6l_;|]l+fJT18u&-AbMs9Git8K!VHz');
define('SECURE_AUTH_SALT', ')QQ(YTJjRj90UD94(:]@UgYT4-&4;#6G(4+;/7KE36L(5q@73!*0/)hYm1Wbz6Uo');
define('LOGGED_IN_SALT', '-s@!0;uf-Irf|*t7_:4hIS6M(-;+Hc@t;Lf76%]H%6Yr8aLh)Kd[4Vu5iW0)kN74');
define('NONCE_SALT', '16/C(*4yWC+]_Q:+716FPLEA|kH~E306Z@947T!mBjl2H7nodx6O|+Wh;67c6VJ|');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'smid_dev';


/* Add any custom values between this line and the "stop editing" line. */

define('WP_ALLOW_MULTISITE', true);
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

define( 'DISALLOW_FILE_EDIT', true );
define( 'CONCATENATE_SCRIPTS', false );
define( 'DUPLICATOR_AUTH_KEY', 'L%!j|lHuw)Qu#ryCRed0#O1-+l6}HG;-I}P4=1Y.Z9.m Q*0j8D,j8QRb<cJu;S)' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
