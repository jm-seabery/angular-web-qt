import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare const google: any;
declare var sld : any;
declare var $: any;
 
// status 
enum FileStateStatus {
	STATUS_EXISTS 			= "Exists",
  STATUS_DOESNOTEXIST = "DoesNotExist",
	STATUS_CREATED 			= "Created",
	STATUS_NOTCREATED 	= "NotCreated",
	STATUS_SAVED 			  = "Saved",
	STATUS_NOTSAVED 		= "NotSaved",
	STATUS_DELETED 			= "Deleted",
	STATUS_NOTDELETED		= "NotDeleted"
}

// Action 
enum FileStateAction {
	ACTION_CHECK_EXISTS = "CheckExists",
	ACTION_CREATE 			= "Create",
	ACTION_SAVE 			  = "Save",
	ACTION_DELETE 			= "Delete"
}

class FileState {

	// constant api call name
	static readonly API_CALL_NAME		= "FileState";

	private Call:string = FileState.API_CALL_NAME;	/// required - Should be 'FileState'
	Filename:string = "";							/// name of the file
	FileSize:number = 0;							/// size of the file in bytes
	FileData:string = "";							/// string buffer containing file data
	ModificationDate:string = "";					/// last modification date in iso 8601 format 

	static readonly FileStatus = FileStateStatus;
  readonly FileStatus = FileState.FileStatus;

	static readonly FileAction = FileStateAction;
  readonly FileAction = FileState.FileAction;

	Status:FileStateStatus;
	Action:FileStateAction;

	UserVars = [
	];

	// FIXME: this undoes type safety but does work
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}

// ####################################################################################
class CameraProperty
{
	Name:string;
	Value:string;
};

class CameraDetails
{
	Name:string;
	CurrentResolution:string;
	Position:number;
	ResolutionList:string[];
	PropertyList:CameraProperty[];
};

// status 
enum CameraStateStatus {
	STATUS_NOTCONNECTED 	= "NotConnected",
	STATUS_CONNECTED 		= "Connected",
	STATUS_CALIBRATED 		= "Calibrated",
	STATUS_NOTCALIBRATED 	= "NotCalibrated",
	STATUS_GRABBING 		= "Grabbing",
	STATUS_RECONNECTING		= "Reconnecting"
}

// Action 
enum CameraStateAction {
	ACTION_CHECK 				= "Check",
	ACTION_FLIP 				= "Flip",
	ACTION_CHANGE_RESOLUTION 	= "ChangeResolution",
	ACTION_CHANGE_PRESET 		= "ChangePreset"
}

class CameraState {

	// constant api call name
	static readonly API_CALL_NAME		= "CameraState";

	private Call:string = CameraState.API_CALL_NAME;	/// required - Should be 'CameraState'

	CameraCount:number;
	CameraList:CameraDetails[];

	static readonly CameraStatus = CameraStateStatus;
  	readonly CameraStatus = CameraState.CameraStatus;

	static readonly CameraAction = CameraStateAction;
  	readonly CameraAction = CameraState.CameraAction;

	Status:CameraStateStatus;
	Action:CameraStateAction;

	UserVars = [
	];

	// FIXME: this undoes type safety but does work
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}

// ####################################################################################

// status 
enum ProcessLaunchStatus {
	STATUS_LAUNCHED 		= "Launched",
	STATUS_NOTLAUNCHED 		= "NotLaunched",
}

// Action 
enum ProcessLaunchAction {
	ACTION_LAUNCH 			= "Launch",
}

class ProcessLaunch {

	// constant api call name
	static readonly API_CALL_NAME		= "ProcessLaunch";

	private Call:string = ProcessLaunch.API_CALL_NAME;	/// required - Should be 'ProcessLaunch'
	ProcessConfigName:string = "";						/// name of the process config
	ProcessId:number = 0;

	static readonly ProcessLaunchStatus = ProcessLaunchStatus;
  	readonly ProcessLaunchStatus = ProcessLaunch.ProcessLaunchStatus;

	static readonly ProcessLaunchAction = ProcessLaunchAction;
  	readonly ProcessLaunchAction = ProcessLaunch.ProcessLaunchAction;

	Status:ProcessLaunchStatus;
	Action:ProcessLaunchAction;

	UserVars = [
	];

	// FIXME: this undoes type safety but does work
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}

// status 
enum ProcessStateStatus {
	STATUS_RUNNING 			= "Running",
	STATUS_TERMINATED 		= "Terminated",
	STATUS_NOTTERMINATED 	= "NotTerminated",
	STATUS_UNKNOWN			= "Unknown"
}

// Action 
enum ProcessStateAction {
	ACTION_CHECK 			= "Check",
	ACTION_TERMINATE		= "Terminate"
}
// ####################################################################################
class ProcessState {

	// constant api call name
	static readonly API_CALL_NAME		= "ProcessState";

	private Call:string = ProcessState.API_CALL_NAME;	/// required - Should be 'ProcessState'

	ProcessId:number = 0;

	static readonly ProcessStateStatus = ProcessStateStatus;
  	readonly ProcessStateStatus = ProcessState.ProcessStateStatus;

	static readonly ProcessStateAction = ProcessStateAction;
  	readonly ProcessStateAction = ProcessState.ProcessStateAction;

	Status:ProcessStateStatus;
	Action:ProcessStateAction;

	UserVars = [
	];

	// FIXME: this undoes type safety but does work
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
// ####################################################################################
class NetworkInterfaceCommon
{
	Address:string;
	Netmask:string;
	IsP2P: boolean;
	DestinationAddress: string;
	BroadcastAddress: string;
};

class NetworkInterfaceData
{
	HasIP6:boolean;  
	Name:string;
  MacAddress:string;     
	IP4Data:NetworkInterfaceCommon;
	IP6Data:NetworkInterfaceCommon;
};

// status 
enum NetworkInterfaceStateStatus {

	STATUS_UPDATED 		= "Updated",
	STATUS_NOTUPDATED	= "NotUpdated"
}

// Action 
enum NetworkInterfaceStateAction {
	ACTION_UPDATE 				= "Update",

}

class NetworkInterfaceState {

	// constant api call name
	static readonly API_CALL_NAME		= "NetworkInterfaceState";

	private Call:string = NetworkInterfaceState.API_CALL_NAME;	/// required - Should be 'NetworkInterfaceState'

	InterfaceCount:number;
	InterfaceList:NetworkInterfaceData[];

	static readonly InterfaceStatus = NetworkInterfaceStateStatus;
  	readonly InterfaceStatus = NetworkInterfaceState.InterfaceStatus;

	static readonly InterfaceAction = NetworkInterfaceStateAction;
  	readonly InterfaceAction = NetworkInterfaceState.InterfaceAction;

	Status:NetworkInterfaceStateStatus;
	Action:NetworkInterfaceStateAction;

	UserVars = [
	];

	// FIXME: this undoes type safety but does work
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
// ####################################################################################
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    lastProcessId:number = -999;

    example1URL;
    example2URL;
    example3URL;
    constructor(private sanitizer: DomSanitizer) {
        this.example1URL = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/s4LAAYHnbn0?ecver=2');
        this.example2URL = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/X8hBKX2lgn4?ecver=2');
        this.example3URL = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/OWThL97tq3k?ecver=2');
  
        // register functions the c++ side can call to the local class functions
        (window as any).RegisterJavascriptFunction("ApplicationToWebMessage", (msg:any) => {
          this.NativeMessage(msg);
        });
      }

  ngOnInit() {
  }
  
  setProcessId(processId:number ): void{
    this.lastProcessId = processId;
  }

  onFileStateExample(event: any) {

    const fileStateClass = new FileState({"Filename": "/home/john/Documents/test.txt"});
    fileStateClass.Action = FileState.FileAction.ACTION_CHECK_EXISTS;
    fileStateClass.UserVars.push({
        "Name" : "Var2", 
        "Value" : "Adding another var I need to track"
    });

    //console.log(testClassVar);

    sld.SendMessageToApp(JSON.stringify(fileStateClass));
    
  }

  onFileStateSaveExample(event: any) {

    const fileStateClass = new FileState({"Filename": "/home/john/Documents/somefile.txt"});
    fileStateClass.Action = FileState.FileAction.ACTION_SAVE;
    fileStateClass.FileData = "Put this string into a file";
    fileStateClass.UserVars.push({
        "Name" : "SaveTracker", 
        "Value" : "Adding another var I need to track"
    });

    //console.log(testClassVar);

    sld.SendMessageToApp(JSON.stringify(fileStateClass));
    
  }

  onCameraStateExample(event: any) {
    const testClassVar = new CameraState();
    testClassVar.Action = CameraState.CameraAction.ACTION_CHECK;
    testClassVar.UserVars.push({
        "Name" : "CameraVar", 
        "Value" : "This is a camera request"
    });

    //console.log(testClassVar);

    sld.SendMessageToApp(JSON.stringify(testClassVar));
    
  }

  onProcessLaunch(event: any) {
    const testClassVar = new ProcessLaunch();
    testClassVar.Action = ProcessLaunch.ProcessLaunchAction.ACTION_LAUNCH;
    testClassVar.ProcessConfigName = "launch-1";
    testClassVar.UserVars.push({
        "Name" : "LaunchVar", 
        "Value" : "This is a process launch request"
    });

    //console.log(testClassVar);

    sld.SendMessageToApp(JSON.stringify(testClassVar));
    
  }

  onProcessState(event: any) {

    const testClassVar = new ProcessState();
    testClassVar.Action = ProcessState.ProcessStateAction.ACTION_TERMINATE;
    testClassVar.ProcessId = this.lastProcessId;
    testClassVar.UserVars.push({
        "Name" : "ProcessStateVar", 
        "Value" : "This is a process state request"
    });

    //console.log(testClassVar);

    sld.SendMessageToApp(JSON.stringify(testClassVar));
  }

  onNetworkInterfaceExample(event: any) {
    const testClassVar = new NetworkInterfaceState();
    testClassVar.Action = NetworkInterfaceState.InterfaceAction.ACTION_UPDATE;
    testClassVar.UserVars.push({
        "Name" : "NetworkStateVar", 
        "Value" : "This is a network state request"
    });

    //console.log(testClassVar);

    sld.SendMessageToApp(JSON.stringify(testClassVar));
    
  }

  NativeMessage(msg) {
    var nativeMsg = JSON.parse(msg);
    //console.log("%o", nativeMsg);

    if( nativeMsg.Call == FileState.API_CALL_NAME)
    {
      const fileStateClass = new FileState(nativeMsg);
      console.log("Output %o", fileStateClass);
      if(fileStateClass.Action == FileState.FileAction.ACTION_CREATE &&
        fileStateClass.Status == FileState.FileStatus.STATUS_CREATED )
        {
            // file was created successfully
        }
    }

    if( nativeMsg.Call == CameraState.API_CALL_NAME)
    {
      const testClassVar = new CameraState(nativeMsg);
      console.log("Output %o", testClassVar);
    }

    if( nativeMsg.Call == ProcessLaunch.API_CALL_NAME)
    {
      const testClassVar = new ProcessLaunch(nativeMsg);
      console.log("Output %o", testClassVar);

      if( testClassVar.Status == testClassVar.ProcessLaunchStatus.STATUS_LAUNCHED)
        this.setProcessId(testClassVar.ProcessId);
      
        console.log("this.lastProcessId  %d", this.lastProcessId );
    }

    if( nativeMsg.Call == ProcessState.API_CALL_NAME)
    {
      const testClassVar = new ProcessState(nativeMsg);
      console.log("Output %o", testClassVar);
    }

    if( nativeMsg.Call == NetworkInterfaceState.API_CALL_NAME)
    {
      const testClassVar = new NetworkInterfaceState(nativeMsg);
      console.log("Output %o", testClassVar);
    }    
  }
} 
