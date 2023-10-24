/** @jsxRuntime classic */
/** @jsx jsx */

import FormInputText from "@/components/elements/Forms/FormInputText"
import { jsx, css } from "@emotion/react"
import { useForm, useFieldArray } from "react-hook-form"
import { PlusCircleIcon, QuestionMarkCircleIcon, TrashIcon } from "@heroicons/react/24/solid"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const baseContactFormStyle = css`
  padding: 0px 16px 100px 16px;
  position: relative;
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 300px;
    overflow-y: scroll;
  }

  label {
    font-size: 12px;
  }

  .field-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
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

  button {
    background: #04a95b;
    padding: 8px;
    color: white;
    outline: none;
    font-size: 14px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    width: 100%;

    box-sizing: border-box;

    &:disabled {
      opacity: 50%;
    }
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
  name: string
  phones: {
    number: string
  }[]
}

interface ContactFormProps {
  isEditForm?: boolean
}

const ContactForm = ({ isEditForm }: ContactFormProps) => {
  const [isShowTooltip, setIsShowTooltip] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phones: [
        {
          number: "",
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
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

  const onSubmit = (data: FormValues) => {
    console.log(data) // Handle form submission here
  }

  return (
    <div css={baseContactFormStyle}>
      <form onSubmit={handleSubmit(onSubmit)} id="form">
        <div className="field-wrapper">
          <label htmlFor="contact-name">Contact Name</label>
          <FormInputText
            id="contact-name"
            placeholder="Contact Name"
            {...register("name", {
              required: true,
              pattern: {
                value: /^[a-z0-9]+$/i,
                message: "No special characters",
              },
            })}
          />
          {errors.name?.message && <label className="error">{errors.name?.message}</label>}
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
            <button type="button" onClick={handleAddNumber}>
              <PlusCircleIcon className="icon" />
            </button>
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
                {...register(`phones.${index}.number`, { required: true })}
              />
              <button
                onClick={() => handleDeleteNumber(index)}
                className="button-delete"
                disabled={fields.length === 1}
              >
                <TrashIcon className="icon" />
              </button>
            </motion.div>
          ))}
        </div>
      </form>

      <div className="button-wrapper">
        <button type="submit" form="form" disabled={!dirtyFields.name}>
          {isEditForm ? "Edit" : "Save"}
        </button>
      </div>
    </div>
  )
}

export default ContactForm
