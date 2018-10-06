import {mount} from 'react-mounter';
import App from '../../imports/ui/App';
import Sala from "../../imports/ui/Sala";


FlowRouter.route("/",{
	action: function(params, queryParams) {
		mount(App)
	}
})



FlowRouter.route("/sala/:id", {
	action: function(params, queryParams) {
		mount(Sala, {id:params.id}) 
	}
});