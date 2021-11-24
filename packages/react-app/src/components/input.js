import { Textarea, Spacer, Button, useInput  } from "@geist-ui/react"
const Input = ({disabled}) => {
    const { setState, bindings } = useInput('')
    return (
      <>
        <Textarea resize='vertical' disabled={disabled} width="50%" {...bindings}/>
        <Spacer h={.5} />
        <Button disabled={disabled} auto type="secondary" scale={1/3} onClick={() => setState(Math.random().toString(32))}>Submit Idea</Button>
        <Spacer h={.5} />
      </>
    )
  }


  export default Input