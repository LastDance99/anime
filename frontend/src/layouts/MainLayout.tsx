import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />  {/* 여기에 각 페이지별 내용 */}
    </>
  );
}