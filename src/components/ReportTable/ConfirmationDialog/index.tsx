import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

type TCofirmationDialogProps = {
  open: boolean
  handleCancel: () => void
  handleOk: () => void
}

const ConfirmationDialog = ({
  open,
  handleCancel,
  handleOk,
}: TCofirmationDialogProps) => {
  return (
    <Dialog maxWidth="xs" open={open} sx={{ fontFamily: 'sans-serif' }}>
      <DialogTitle>Confirm action</DialogTitle>
      <DialogContent>
        Are you sure you want to move this transaction?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
