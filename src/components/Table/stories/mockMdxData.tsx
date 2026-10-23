import * as React from "react"
import { Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

/*
 * Note on the Chakra Table components:
 *
 * Only the `Td`, `Th`, `Tr`, `Tbody`, and `Thead` components are used because those are the
 * only table elements we are defining styles with and sending to the MDX provider
 *
 * The use of `textAlign` is a mock for the `align` prop from the MDX parsing going to
 * the former prop in the given Chakra component.
 *
 * The rows are sample data for the stories, not real program figures.
 */

export const MdxDemoData = () => (
  <>
    <Thead>
      <Tr>
        <Th>Column head</Th>
        <Th>Column head</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Having</Td>
        <Td>Wanting things: a home, a phone, a stable income</Td>
      </Tr>
      <Tr>
        <Td>Doing</Td>
        <Td>
          Wanting experiences: travelling, learning a craft, building something
          with friends
        </Td>
      </Tr>
      <Tr>
        <Td>Being</Td>
        <Td>
          Wanting to become someone: kinder, braver, more present for the people
          around you
        </Td>
      </Tr>
    </Tbody>
  </>
)

export const MdxNumericData = () => (
  <>
    <Thead>
      <Tr>
        <Th></Th>
        <Th textAlign="end">Sessions per month</Th>
        <Th textAlign="end">Average minutes</Th>
        <Th>Format</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Knowledge</Td>
        <Td textAlign="end">12</Td>
        <Td textAlign="end">25</Td>
        <Td>Articles and guides</Td>
      </Tr>
      <Tr>
        <Td>Tools</Td>
        <Td textAlign="end">8</Td>
        <Td textAlign="end">40</Td>
        <Td>Templates and trackers</Td>
      </Tr>
      <Tr>
        <Td>Community</Td>
        <Td textAlign="end">4</Td>
        <Td textAlign="end">90</Td>
        <Td>Live gatherings</Td>
      </Tr>
    </Tbody>
  </>
)

export const MdxLongTextData = () => (
  <>
    <Thead>
      <Tr>
        <Th>Stage</Th>
        <Th>What it looks like</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Awareness</Td>
        <Td>
          You notice a pattern in how you react, often after the fact, and start
          to name it.
        </Td>
      </Tr>
      <Tr>
        <Td>Acceptance</Td>
        <Td>
          You stop arguing with the pattern and treat it as information about
          what you need.
        </Td>
      </Tr>
      <Tr>
        <Td>Action</Td>
        <Td>
          You try a small change, keep what works, and let the rest go without
          judging yourself.
        </Td>
      </Tr>
    </Tbody>
  </>
)
