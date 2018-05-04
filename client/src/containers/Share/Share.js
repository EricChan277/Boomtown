import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './styles.css';

class Share extends Component {
    state = {
        finished: false,
        stepIndex: 0,
        value: []
    };
    onSubmit = values => {
        console.log(values);
    };

    validate(...args) {
        console.log('Validating:', args);
    }

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    renderStepActions(step) {
        const { stepIndex } = this.state;
        const handleChange = (event, index, values) =>
            this.setState({ values });
        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex === 3 ? 'Finish' : 'Next'}
                    disableTouchRipple
                    disableFocusRipple
                    primary
                    onClick={this.handleNext}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple
                        disableFocusRipple
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const { finished, stepIndex } = this.state;

        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Add an Image</StepLabel>
                        <StepContent>
                            <p>
                                We live in a visual culture. <br />
                                Upload an image of the item you're sharing.
                            </p>
                            <input
                                type="file"
                                required
                                accept=".png, .jpg, jpeg, .gif "
                            />
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Add a Title & Description</StepLabel>
                        <StepContent>
                            <p>
                                Folks need to know what you're sharing. Give
                                them a clue by adding a title & description.
                            </p>
                            <TextField
                                type="text"
                                floatingLabelText="Title"
                                errorText="This field is required"
                            />
                            <TextField
                                type="text"
                                floatingLabelText="Description"
                                errorText="This field is required"
                                multiLine
                                rows={3}
                            />

                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>Categorize your Item</StepLabel>
                        <StepContent>
                            <p>
                                To share an item, you'll need to add it to our
                                list of categories. You can select multiple
                                categories.
                            </p>

                            <SelectField
                                value={this.state.value}
                                multiple
                                hintText="Select some catagories"
                                onChange={this.handleChange}
                                name="tags"
                            >
                                <MenuItem
                                    value={1}
                                    label="electronics"
                                    primaryText="Electronics"
                                />
                                <MenuItem
                                    value={2}
                                    label="household items"
                                    primaryText="Household Items"
                                />
                                <MenuItem
                                    value={3}
                                    label="musical instruments"
                                    primaryText="Musical Instruments"
                                />
                                <MenuItem
                                    value={4}
                                    label="physical media"
                                    primaryText="Physical Media"
                                />
                                <MenuItem
                                    value={5}
                                    label="recreational equipment"
                                    primaryText="Recreational Equipment"
                                />
                                <MenuItem
                                    value={5}
                                    label="tools"
                                    primaryText="Tools"
                                />
                            </SelectField>

                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Confirm Things!</StepLabel>
                        <StepContent>
                            <p>
                                Great! If you're happy with everything, tap the
                                button.
                            </p>
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

export default Share;
