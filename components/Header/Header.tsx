import { BiSolidCameraMovie } from "react-icons/bi";
import {useTranslations} from 'next-intl';
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {

  const t = useTranslations('HomePage');

  return (
    <div className="flex justify-center items-center relative z-50">
        <div className="flex justify-between max-lg:justify-center items-center py-5 w-full max-w-[1200px]">
            <div className="flex items-center gap-2">
                <BiSolidCameraMovie size={40} className="text-white" />
                <h1 className="text-4xl font-black text-white">HFilms</h1>
            </div>
            <div className="flex gap-5 text-white max-lg:hidden">
                <h2>Home</h2>
                <h2>Movies</h2>
                <h2>{t('title')}</h2>
                <LanguageSwitcher />
            </div>
        </div>
    </div>
  )
}

export default Header