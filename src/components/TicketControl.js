import React, { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';

function TicketControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      // new code!
      setSelectedTicket(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleDeletingTicket = (id) => {
    const newMainTicketList = mainTicketList.filter(ticket => ticket.id !== id);
    setMainTicketList(newMainTicketList);
    // new code!
    setSelectedTicket(null);
  }

  const handleEditClick = () => {
    // new code!
    setEditing(true);
  }

  const handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = mainTicketList
    // new code: selectedTicket.id
    .filter(ticket => ticket.id !== selectedTicket.id)
    .concat(ticketToEdit);
    setMainTicketList(editedMainTicketList);
    // new code!
    setEditing(false);
    setSelectedTicket(null);
  }

  const handleAddingNewTicketToList = (newTicket) => {
    // new code!
    const newMainTicketList = mainTicketList.concat(newTicket);
    // new code!
    setMainTicketList(newMainTicketList);
    setFormVisibleOnPage(false)
  }

  const handleChangingSelectedTicket = (id) => {
    // new code: updated variable name to 'selection'
    // so there's no clash with the state variable 'selectedTicket'
    const selection = mainTicketList.filter(ticket => ticket.id === id)[0];
    // new code!
    setSelectedTicket(selection);
  }

  let currentlyVisibleState = null;
  let buttonText = null; 

  // new code: editing
  if (editing) {      
    currentlyVisibleState = 
      <EditTicketForm 
        // new code: selectedTicket
        ticket = {selectedTicket} 
        onEditTicket = {this.handleEditingTicketInList} />
    buttonText = "Return to Ticket List";
  // new code: selectedTicket
  } else if (selectedTicket != null) {
    currentlyVisibleState = 
      <TicketDetail 
        // new code: selectedTicket
        ticket={selectedTicket} 
        onClickingDelete={this.handleDeletingTicket}
        onClickingEdit = {this.handleEditClick} />
    buttonText = "Return to Ticket List";
  } else if (formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List"; 
  } else {
    currentlyVisibleState = 
      <TicketList 
        onTicketSelection={this.handleChangingSelectedTicket} 
        // new code!
        ticketList={mainTicketList} />;
    buttonText = "Add Ticket"; 
  }
  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={this.handleClick}>{buttonText}</button> 
    </React.Fragment>
  );

}

export default TicketControl;

