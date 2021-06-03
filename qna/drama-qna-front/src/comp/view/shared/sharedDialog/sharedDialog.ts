import { dialog } from '@nara.platform/react-ui';


function getSaveConfirmed() {
  //
  return dialog.confirm({
    title: 'Save',
    message: 'Will you save the changes?',
  });
}

export {
  getSaveConfirmed,
};
