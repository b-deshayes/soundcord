import { useState } from 'react'
import { Modal, Text, Input, Button } from '@nextui-org/react'
import { supabase } from '../lib/supabase'

const Whitelist = ({ handleClose, show }) => {
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')

  const addUserToWhitelist = async () => {
    setLoading(true)

    const { error } = await supabase.from('whitelist').insert({
      id: userId,
    })

    if (error) console.error(error)

    setLoading(false)
    close()
  }

  const close = () => {
    reset()
    handleClose()
  }

  const reset = () => {
    setUserId('')
  }

  return (
    <Modal closeButton blur aria-labelledby='modal-title' open={show} onClose={close}>
      <Modal.Header>
        <Text id='modal-title' size={18}>
          Ajouter un utilisateur à la
          <Text b size={18}>
            {' '}
            whitelist
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          disabled={loading}
          labelPlaceholder='Discord identifier'
          clearable
          bordered
          fullWidth
          color='primary'
          size='md'
          value={userId}
          onChange={(e) => setUserId(e.target?.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color='error' onClick={close} disabled={loading}>
          Annuler
        </Button>
        <Button auto onClick={addUserToWhitelist} loading={loading}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Whitelist
