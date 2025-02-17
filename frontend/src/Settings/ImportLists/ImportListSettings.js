import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import { icons } from 'Helpers/Props';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import translate from 'Utilities/String/translate';
import ImportListsExclusionsConnector from './ImportListExclusions/ImportListExclusionsConnector';
import ImportListsConnector from './ImportLists/ImportListsConnector';
import ManageImportListsModal from './ImportLists/Manage/ManageImportListsModal';
import ImportListOptions from './Options/ImportListOptions';

class ImportListSettings extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this._saveCallback = null;

    this.state = {
      isSaving: false,
      hasPendingChanges: false,
      isManageImportListsOpen: false
    };
  }

  //
  // Listeners

  setChildSave = (saveCallback) => {
    this._saveCallback = saveCallback;
  };

  onChildStateChange = (payload) => {
    this.setState(payload);
  };

  setListOptionsRef = (ref) => {
    this._listOptions = ref;
  };

  onManageImportListsPress = () => {
    this.setState({ isManageImportListsOpen: true });
  };

  onManageImportListsModalClose = () => {
    this.setState({ isManageImportListsOpen: false });
  };

  onHasPendingChange = (hasPendingChanges) => {
    this.setState({
      hasPendingChanges
    });
  };

  onSavePress = () => {
    if (this._saveCallback) {
      this._saveCallback();
    }
  };

  //
  // Render

  render() {
    const {
      isTestingAll,
      dispatchTestAllImportLists
    } = this.props;

    const {
      isSaving,
      hasPendingChanges,
      isManageImportListsOpen
    } = this.state;

    return (
      <PageContent title={translate('ImportListSettings')}>
        <SettingsToolbarConnector
          isSaving={isSaving}
          hasPendingChanges={hasPendingChanges}
          additionalButtons={
            <Fragment>
              <PageToolbarSeparator />

              <PageToolbarButton
                label={translate('TestAllLists')}
                iconName={icons.TEST}
                isSpinning={isTestingAll}
                onPress={dispatchTestAllImportLists}
              />

              <PageToolbarButton
                label={translate('ManageLists')}
                iconName={icons.MANAGE}
                onPress={this.onManageImportListsPress}
              />
            </Fragment>
          }
          onSavePress={this.onSavePress}
        />

        <PageContentBody>
          <ImportListsConnector />

          <ImportListOptions
            setChildSave={this.setChildSave}
            onChildStateChange={this.onChildStateChange}
          />

          <ImportListsExclusionsConnector />
          <ManageImportListsModal
            isOpen={isManageImportListsOpen}
            onModalClose={this.onManageImportListsModalClose}
          />
        </PageContentBody>
      </PageContent>
    );
  }
}

ImportListSettings.propTypes = {
  isTestingAll: PropTypes.bool.isRequired,
  dispatchTestAllImportLists: PropTypes.func.isRequired
};

export default ImportListSettings;
