import CreateAdsForm from '../createAds/CreateAdsForm'
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';

const CreateFormPage = ({ type, onPageChange }) => {

  return (
    <div className="create_ads__form-mobile">
      <div className="create_ads__back" onClick={() => onPageChange("ChooseTypePage")}>
        <ArrowLeftIcon />
        Назад
      </div>
      <CreateAdsForm onSuccess={() => onPageChange("MainPage")} type={type} />
    </div>
  )
}

export default CreateFormPage;
