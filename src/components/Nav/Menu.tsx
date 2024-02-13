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
  const direction = "ltr"

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
        const section = restSections[sectionKey];

        const hasNestedItems = section.items.some(item => item.items);

        return (
          <NavDropdown key={sectionKey} section={section}>
            {hasNestedItems ? (
              // Render sections with a title
              <Flex flexDir={direction === "ltr" ? "row" : "row-reverse"}>
                {section.items.map((section, index) => (
                  <Flex flexDir="column" gap={4} key={index}>
                    <List m={0}>
                      <NavDropdown.Title>{section.text}</NavDropdown.Title>
                      {(section.items || []).map((item, itemIndex) => (
                        <NavDropdown.Item key={itemIndex}>
                          <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                            {item.text}
                          </NavDropdown.Link>
                        </NavDropdown.Item>
                      ))}
                    </List>
                  </Flex>
                ))}
              </Flex>
            ) : (
              // Render sections without a title as a flat list
              section.items.map((item, index) => (
                <NavDropdown.Item
                  key={index}
                  isLast={index === section.items.length - 1}
                >
                  <NavDropdown.Link to={item.to} isPartiallyActive={false}>
                    {item.text}
                  </NavDropdown.Link>
                </NavDropdown.Item>
              ))
            )}
          </NavDropdown>
        );
      })}

    </Flex>
  )
}

export default Menu
