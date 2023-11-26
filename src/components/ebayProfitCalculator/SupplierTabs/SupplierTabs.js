import React, { useState } from "react"

const Tab = ({ children, isActive, label }) => {
  return isActive ? (
    <div>
      <h2>Kalkulator {label}</h2>
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
          <div className="">
            {items.map((item, index) => (
              <button
                key={index}
                className={`epc-tabs__button ${
                  activeTab === index ? "active" : ""
                }`}
                onClick={() => handleTabClick(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="">
          <div className="">
            {items.map((item, index) => (
              <Tab
                key={index}
                isActive={activeTab === index}
                label={item.label}
              >
                {item.children}
              </Tab>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierTabs
