import { Command } from 'cmdk'
import { useEffect, useState } from 'react'

type CommandMenuProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CommandMenu = ({ open, setOpen }: CommandMenuProps) => {
    // Toggle the menu when ⌘K or Ctrl+K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(o => !o)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [setOpen])

    return (
        <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu">
            <Command.Input />
            <Command.List>
                <Command.Empty>No results found.</Command.Empty>

                <Command.Group heading="Letters">
                    <Command.Item>a</Command.Item>
                    <Command.Item>b</Command.Item>
                    <Command.Separator />
                    <Command.Item>c</Command.Item>
                </Command.Group>

                <Command.Item>Apple</Command.Item>
            </Command.List>
        </Command.Dialog>
    )
}
