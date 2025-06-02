import MainHeader from '../components/MainHeader/MainHeader';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />  {/* 여기에 각 페이지별 내용 */}
    </>
  );
}