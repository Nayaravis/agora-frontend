import React, { useState } from 'react';
import { Avatar, Button, Card, Tabs, Tab, List, ListItem, ListItemText, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/system';

const StyledAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  margin: '0 auto',
  border: '3px solid #1976d2',
});

const UserAccountPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState({
    name: 'Erick Moses',
    email: 'Mr_M@example.com',
    joinDate: 'Joined on January 15, 2022',
    avatar: '', 
  });

  const upcomingEvents = [];
  const pastEvents = [];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditProfile = () => {
    alert('Edit profile clicked');
  };

  return (
    <div style={{ maxWidth: '800px', width: "100vh"}}>
      <Card style={{ padding: '20px', textAlign: 'center' }}>
        <StyledAvatar src={user.avatar} alt={user.name}>
          {!user.avatar && user.name.charAt(0)}
        </StyledAvatar>
        
        <h2 style={{ marginTop: '15px' }}>{user.name}</h2>
        <p style={{ color: '#666', marginBottom: '15px' }}>{user.joinDate}</p>
        
        <Button 
          variant="outlined" 
          startIcon={<EditIcon />}
          onClick={handleEditProfile}
          style={{ marginBottom: '20px' }}
        >
          Edit Profile
        </Button>
        
        <Divider style={{ margin: '20px 0' }} />
        
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<EventIcon />} label="Upcoming Events" />
          <Tab icon={<HistoryIcon />} label="Past Events" />
          <Tab icon={<SettingsIcon />} label="Settings" />
        </Tabs>
        
        {activeTab === 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Upcoming Events</h3>
            {upcomingEvents.length > 0 ? (
              <List>
                {upcomingEvents.map(event => (
                  <ListItem key={event.id}>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.date} at ${event.time}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <p>No upcoming events</p>
            )}
          </div>
        )}
        
        {activeTab === 1 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Past Events</h3>
            {pastEvents.length > 0 ? (
              <List>
                {pastEvents.map(event => (
                  <ListItem key={event.id}>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.date} at ${event.time}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <p>No past events</p>
            )}
          </div>
        )}
        
        {activeTab === 2 && (
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <h3>Settings</h3>
            <List>
              <ListItem button>
                <ListItemText primary="Change Password" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Notification Preferences" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Privacy Settings" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Delete Account" style={{ color: 'red' }} />
              </ListItem>
            </List>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserAccountPage;