import React from "react"
import { useToast, Wrap, WrapItem, Button } from '@chakra-ui/react'
import { t } from "@chakra-ui/styled-system/dist/declarations/src/utils"
import useTranslation from "../../i18n/use-translation";
import TransKey from '../../i18n/trans-key'

interface ToastProps {
    title: TransKey,
    status: 'success' | 'error' | 'warning' | 'info'
    position: 'top' | 'bottom'
}

function CustomToast(props: ToastProps) {
    const { title, status, position } = props
    const { t } = useTranslation();
    const toast = useToast()

    return (
        toast({
            title: t(title),
            status: status,
            position: position,
            isClosable: true,
        })
    )

}

export default CustomToast