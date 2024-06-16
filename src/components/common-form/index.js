import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


export default function CommonForm({
  action,
  buttonText,
  isButtonDisabled,
  formControls,
  buttonType,
  formData,
  setFormData,
  handleFileChange
}) { // we will be receiving these as a prop

  function renderInputByComponentType(getCurrentControl) {
    let content = null
    // this component type can be anything. For ex: input, select, textarea, checkbox, etc
    switch (getCurrentControl.componentType) {
      case 'input':
        content = (
          <div className="relative flex items-center mt-8">
            <Input // Below will automatically generate the type of input
              type="text"
              disabled={getCurrentControl.disabled} // if its disabled, then it will render
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) => setFormData({
                ...formData,
                [event.target.name]: event.target.value
              })} // '...formData => we generally destructure so that the old information is not lost. This creates a new object with all the properties of the current formData.'
              className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        )
        break;

      case 'file':
        content = (
          <Label
            for={getCurrentControl.name}
            className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
          >
            <h2>{getCurrentControl.label}</h2>
            <Input
              onChange={handleFileChange}
              id={getCurrentControl.name}
              type='file'
            />
          </Label>
        )
        break;

      default: // same as 'input'
        content = (
          <div className="relative flex items-center mt-8">
            <Input // Below will automatically generate the type of input
              type="text"
              disabled={getCurrentControl.disabled} // if its disabled, then it will render
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) => setFormData({
                ...formData, // we generally destructure so that the old information is not lost
                // This creates a new object with all the properties of the current formData.
                [event.target.name]: event.target.value
              })}
              className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        )
        break;
    }

    return content
  }

  return (
    <form action={action}>
      {
        formControls.map((control) => renderInputByComponentType(control))
      }
      <div className="mt-6 w-full">
        <Button
          type={buttonType || "Submit"}
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
          disabled={isButtonDisabled} // if 'isButtonDisabled' is true, then it will render the 'disabled' property of class
        >
          {buttonText}
        </Button>
      </div>
    </form>
  )
}