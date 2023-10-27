/** @jsxRuntime classic */
/** @jsx jsx */

import FormInputText from "@/components/elements/Forms/FormInputText"
import { jsx, css } from "@emotion/react"
import { useForm, useFieldArray } from "react-hook-form"
import { PlusCircleIcon, QuestionMarkCircleIcon, TrashIcon } from "@heroicons/react/24/solid"
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMutation } from "urql"
import { POST_CONTACT, UPDATE_CONTACT, UPDATE_CONTACT_PHONE_NUMBER } from "@/graphql/mutations"
import PrimaryButton from "@/components/elements/Button/PrimaryButton"
import { toast } from "react-hot-toast"
import { IContact, UpdateFormParamsType } from "@/types"

const baseContactFormStyle = css`
  padding: 0px 16px 100px 16px;
  position: relative;
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 460px;
    overflow-y: scroll;
  }

  label {
    font-size: 12px;
  }

  .field-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 14px;
    }
  }

  .button-wrapper {
    padding: 16px;
    background: white;
    width: 100%;

    position: absolute;
    bottom: 0px;
    left: 0px;

    border-top: 1px solid #d6dfeb;
  }

  .label-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .label-inner-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .label-inner-wrapper .icon-question {
    width: 18px;
    height: 18px;
    fill: #04a95b;

    margin-top: 4px;
  }

  .label-inner-wrapper .tooltip-wrapper {
    position: relative;
  }

  .tooltip {
    position: absolute;
    left: 20px;
    top: 20%;
    background: black;
    color: white;
    font-size: 12px;
    padding: 4px;
    border-radius: 4px;
    width: 100px;
    z-index: 20;
  }

  .label-wrapper button {
    width: max-content;
    padding: 0px;
    background: white;
  }

  .label-wrapper .icon {
    width: 24px;
    height: 24px;
    fill: #04a95b;
  }

  .phone-field-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .phone-field-wrapper .button-delete {
    background: white;
    padding: 8px;
    border-radius: 8px;
    width: max-content;

    &:disabled {
      opacity: 50%;
    }
  }

  .phone-field-wrapper .button-delete .icon {
    width: 16px;
    height: 16px;
    fill: #ed2626;
  }

  .error {
    color: red;
  }
`

interface FormValues {
  first_name: string
  last_name: string
  phones?: {
    number: string
  }[]
}

interface ContactFormProps {
  isEditForm?: boolean
  onClose: () => void
  refetch?: () => void
  data?: IContact
}

interface UpdatePhoneNumberParamsType {
  pk_colums: {
    number: string
    id: number
  }
  new_phone_number: string
}

export interface ContactFormRef {
  resetForm: () => void
}

export const variables = {
  limit: 10,
  offset: 0,
  order_by: {
    created_at: "desc",
  },
}

const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(
  ({ isEditForm, onClose, data, refetch = () => {} }, ref) => {
    const [postContactResult, postContactMutation] = useMutation<any, FormValues>(POST_CONTACT)
    const [updateContactResult, updateContactMutation] = useMutation<
      any,
      UpdateFormParamsType<FormValues>
    >(UPDATE_CONTACT)
    const [updatePhoneNumberResult, updatePhoneNumberMutation] = useMutation<
      any,
      UpdatePhoneNumberParamsType
    >(UPDATE_CONTACT_PHONE_NUMBER)

    const { data: dataPost, fetching: fetchingPost, error: errorPost } = postContactResult
    const { data: dataUpdate, fetching: fetchingUpdate, error: errorUpdate } = updateContactResult
    const { data: dataPhoneNumber, error: errorPhoneNumber } = updatePhoneNumberResult

    const [isShowTooltip, setIsShowTooltip] = useState(false)
    const {
      control,
      handleSubmit,
      register,
      reset,
      setValue,
      formState: { errors, isDirty },
    } = useForm<FormValues>({
      defaultValues: {
        first_name: "",
        last_name: "",
        phones: [
          {
            number: "",
          },
        ],
      },
    })

    const { fields, append, remove, replace } = useFieldArray({
      name: "phones",
      control,
    })

    const handleAddNumber = () => {
      append({
        number: "",
      })
    }

    const handleDeleteNumber = (index: number) => {
      remove(index)
    }

    const onSubmit = (formData: FormValues) => {
      if (isEditForm) {
        const formDataEdit = {
          first_name: formData.first_name,
          last_name: formData.last_name,
        }

        updateContactMutation({
          id: data?.id,
          _set: {
            ...formDataEdit,
          },
        }).then(res => {
          if (!res.error) {
            refetch()
          }
        })
      } else {
        postContactMutation({
          ...formData,
        })
      }
    }

    useEffect(() => {
      if (errorPost || errorUpdate) {
        toast.error((errorPost?.message || errorUpdate?.message) ?? "")
      }
    }, [errorPost, errorUpdate])

    useEffect(() => {
      if (dataPost || dataUpdate) {
        const message = dataPost ? "Success Add Contact" : "Success Edit Contact"
        toast.success(message)
        onClose()
      }
    }, [dataPost, dataUpdate])

    useEffect(() => {
      if (isEditForm) {
        setValue("first_name", data?.first_name ?? "")
        setValue("last_name", data?.last_name ?? "")
        replace(data?.phones || [])
      }
    }, [isEditForm])

    useImperativeHandle(ref, () => ({
      resetForm() {
        reset()
      },
    }))

    return (
      <div css={baseContactFormStyle} data-testid="contact-form">
        <form onSubmit={handleSubmit(onSubmit)} id="form">
          <div className="field-wrapper">
            <label htmlFor="contact-name">First Name</label>
            <FormInputText
              id="contact-name"
              placeholder="First Name"
              {...register("first_name", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/i,
                  message: "No special characters",
                },
              })}
            />
            {errors.first_name?.message && (
              <label data-testid="error-firstname" className="error">
                {errors.first_name?.message}
              </label>
            )}
          </div>
          <div className="field-wrapper">
            <label htmlFor="last-name">Last Name</label>
            <FormInputText
              id="last-name"
              placeholder="Last Name"
              {...register("last_name", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/i,
                  message: "No special characters",
                },
              })}
            />
            {errors.last_name?.message && (
              <label data-testid="error-lastname" className="error">
                {errors.last_name?.message}
              </label>
            )}
          </div>
          <div className="field-wrapper">
            <div className="label-wrapper">
              <div className="label-inner-wrapper">
                <label htmlFor="contact-number">Contact Number</label>
                <div className="tooltip-wrapper">
                  <QuestionMarkCircleIcon
                    className="icon-question"
                    onClick={() => setIsShowTooltip(!isShowTooltip)}
                  />
                  <AnimatePresence>
                    {isShowTooltip && (
                      <motion.div
                        className="tooltip"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <p>You can put multiple numbers</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {!isEditForm && (
                <button type="button" onClick={handleAddNumber} data-testid="button-add-phone">
                  <PlusCircleIcon className="icon" />
                </button>
              )}
            </div>
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", duration: "0.1s" }}
                className="phone-field-wrapper"
              >
                <FormInputText
                  placeholder="Contact Phone Number"
                  type="number"
                  disabled={isEditForm}
                  data-testid={`phones.${index}.number`}
                  {...register(`phones.${index}.number`, { required: true })}
                />
                {!isEditForm && (
                  <button
                    onClick={() => handleDeleteNumber(index)}
                    className="button-delete"
                    disabled={fields.length === 1}
                  >
                    <TrashIcon className="icon" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </form>

        <div className="button-wrapper">
          <PrimaryButton
            isLoading={fetchingPost || fetchingUpdate}
            type="submit"
            form="form"
            disabled={!isDirty}
          >
            {isEditForm ? "Edit" : "Save"}
          </PrimaryButton>
        </div>
      </div>
    )
  }
)

export default ContactForm
