import React, { useState } from "react"
import { Button, Heading } from "@chakra-ui/react"

const Tab = ({ children, isActive, label }) => {
  return isActive ? (
    <div>
      <Heading as="h2">Kalkulator {label}</Heading>
      {children}
    </div>
  ) : null
}

const SupplierTabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = index => {
    setActiveTab(index)
  }

  return (
    <div className="epc-tabs">
      <div className="">
        <div className="">
          {items.map((item, index) => (
            <Button
              key={index}
              className={`epc-tabs__button ${
                activeTab === index ? "active" : ""
              }`}
              onClick={() => handleTabClick(index)}
              colorScheme="blue"
              mr={3}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="">
        <div className="">
          {items.map((item, index) => (
            <Tab key={index} isActive={activeTab === index} label={item.label}>
              {item.children}
            </Tab>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupplierTabs
