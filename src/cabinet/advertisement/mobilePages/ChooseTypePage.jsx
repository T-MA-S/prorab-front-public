import TypeList from "../desktopPages/TypeList";
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';


const ChooseTypePage = ({ category, onPageChange, onTypeChange }) => {
  return (
    <>
      <div className="cabinet_ads__left">
        <div className="create_ads__back" onClick={() => onPageChange("MainPage")}>
          <ArrowLeftIcon />
          Создать объявления
        </div>
        <TypeList category={category} type={-1} onTypeChange={(id) => {
          onTypeChange(id);
          onPageChange("CreateFormPage");
        }} />
      </div>
    </>
  )
}

export default ChooseTypePage;