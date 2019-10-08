import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_auto_scheduling';

export class Gantt extends Component {

    // instance of gantt.dataProcessor
    dataProcessor = null;

    /**
     * applies one of the predefined settings of the time scale
     */

    setZoom(value) {
        switch (value) {
            case 'Days':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = 'week';
                gantt.config.date_scale = '#%W';
                gantt.config.subscales = [
                    { unit: 'day', step: 1, date: '%d %M' }
                ];
                gantt.config.scale_height = 60;
                break;
            case 'Months':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = 'month';
                gantt.config.date_scale = '%F';
                gantt.config.scale_height = 60;
                gantt.config.subscales = [
                    { unit: 'week', step: 1, date: '#%W' }
                ];
                break;
            default:
                break;
        }
    }

    setModifiable(temp) {
        gantt.config.readonly = temp;
    }

    initGanttDataProcessor() {
        /**
         * type: "task"|"link"
         * action: "create"|"update"|"delete"
         * item: data object object
         */
        const onDataUpdated = this.props.onDataUpdated;
        this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
            return new Promise((resolve, reject) => {
                if (onDataUpdated) {
                    onDataUpdated(type, action, item, id);
                }

                // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
                // resolve({id: databaseId});
                return resolve();
            });
        });
    }

    shouldComponentUpdate(nextProps) {
        return this.props.zoom !== nextProps.zoom || this.props.modifiable !== nextProps.modifiable;
    }

    componentDidUpdate() {
        gantt.render();
    }

    componentDidMount() {
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        gantt.config.auto_scheduling = true;
        gantt.config.auto_scheduling_strict = true;
        gantt.config.auto_scheduling_compatibility = true;
        gantt.config.show_grid = false;
        gantt.config.start_date = new Date(2019, 0, 1);
        gantt.config.end_date = new Date(2019, 11, 32);
        const { tasks } = this.props;
        gantt.init(this.ganttContainer);
        this.initGanttDataProcessor();
        gantt.parse(tasks);
    }

    componentWillUnmount() {
        if (this.dataProcessor) {
            this.dataProcessor.destructor();
            this.dataProcessor = null;
        }
    }

    render() {
        const { zoom } = this.props;
        const { modifiable } = this.props;
        this.setZoom(zoom);
        this.setModifiable(modifiable);
        return (
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{ height: '700px' }}
            />
        );

    }
}
