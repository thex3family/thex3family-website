import { Flex, FlexProps, List } from "@chakra-ui/react"

import NavDropdown from "./Dropdown"
// import { getDirection } from "../../utils/translations"
// import { Lang } from "../../utils/languages"
import { ISections } from "./types"

export interface IProps extends FlexProps {
  path: string
  sections: ISections
}

const Menu: React.FC<IProps> = ({ path, sections, ...props }) => {

  const { ...restSections } = sections

  return (
    <Flex
      as={List}
      alignItems="center"
      m={0}
      gap={{ base: 3, xl: 6 }}
      {...props}
    >
      {Object.keys(restSections).map((sectionKey) => {
        const section = restSections[sectionKey]

        return (
          <NavDropdown key={sectionKey} section={section}>
            {section.items.map((item, index) => (
              <NavDropdown.Item
                key={index}
                isLast={index === section.items.length - 1}
              >
                <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                  {item.text}
                </NavDropdown.Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        )
      })}
    </Flex>
  )
}

export default Menu
