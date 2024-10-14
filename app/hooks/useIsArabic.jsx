import { usePathname } from 'next/navigation';

export default function useIsArabic() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // Extraire la locale de l'URL

  // Vérifier si locale est définie et commence par 'ar-'
  if (locale) {
    return locale.startsWith('ar-');
  }

  // Retourner false par défaut si aucune locale n'est trouvée
  return false;
}