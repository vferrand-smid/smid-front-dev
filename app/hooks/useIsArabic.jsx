import { useSearchParams } from "next/navigation";

export default function useIsArabic(){
  const searchParams = useSearchParams()
  const locale = searchParams.get('locale')
  return locale.startsWith('ar-')
}