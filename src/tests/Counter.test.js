import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import Counter from "../components/Counter"



describe("Counter",()=>{
    test("Deve incrementar mais 1 ao contador quando o botao de incremento for clicado", async()=>{
        render(<Counter/>)
        
        const user = userEvent.setup()

        const counter = screen.getByText("0")
        const incrementButton = screen.getByText("+")

        await user.click(incrementButton)
        await user.click(incrementButton)
        await user.click(incrementButton)

        const counterValue = screen.getByText("3")
        expect(counterValue).toBeInTheDocument()
    

    })
})